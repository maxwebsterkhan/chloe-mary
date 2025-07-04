import { NextRequest, NextResponse } from 'next/server';
import { getImageUrl } from '@/lib/s3';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    // Decode the key in case it was URL encoded
    const decodedKey = decodeURIComponent(key);
    
    const url = await getImageUrl(decodedKey);
    
    const response = NextResponse.json({
      success: true,
      key: decodedKey,
      url,
    });

    // Add cache headers for better performance
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Vary', 'Accept-Encoding');
    
    return response;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get image URL',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 