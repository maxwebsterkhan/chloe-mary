import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  // Uncomment if using custom endpoint (e.g., DigitalOcean Spaces)
  // endpoint: process.env.AWS_S3_ENDPOINT,
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export interface S3Image {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

/**
 * List images from S3 bucket with optional prefix filter
 */
export async function listImages(prefix?: string): Promise<S3Image[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: 1000,
    });

    const response = await s3Client.send(command);
    
    if (!response.Contents) {
      return [];
    }

    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const imageObjects = response.Contents.filter(obj => 
      obj.Key && imageExtensions.some(ext => 
        obj.Key!.toLowerCase().endsWith(ext)
      )
    );

    // Generate signed URLs in parallel
    const signedUrls = await Promise.all(
      imageObjects.map((obj) => getImageUrl(obj.Key!))
    );

    const images: S3Image[] = imageObjects.map((obj, idx) => ({
      key: obj.Key!,
      url: signedUrls[idx],
      lastModified: obj.LastModified,
      size: obj.Size,
    }));

    return images;
  } catch (error) {
    console.error('Error listing images from S3:', error);
    throw new Error('Failed to fetch images from S3');
  }
}

/**
 * Get a URL for a specific image
 */
export async function getImageUrl(key: string): Promise<string> {
  const cmd = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  // Default 1-hour expiry; adjust via env if needed
  const expiresSec = Number(process.env.S3_SIGNED_URL_TTL ?? '3600');
  return getSignedUrl(s3Client, cmd, { expiresIn: expiresSec });
}

/**
 * Get images organized by folders/categories
 */
export async function getImagesByCategory(): Promise<Record<string, S3Image[]>> {
  try {
    const images = await listImages();
    const categorized: Record<string, S3Image[]> = {};

    images.forEach(image => {
      const pathParts = image.key.split('/');
      const category = pathParts.length > 1 ? pathParts[0] : 'uncategorized';
      
      if (!categorized[category]) {
        categorized[category] = [];
      }
      
      categorized[category].push(image);
    });

    return categorized;
  } catch (error) {
    console.error('Error organizing images by category:', error);
    throw new Error('Failed to organize images by category');
  }
} 