import { NextRequest, NextResponse } from 'next/server';
import { listImages } from '@/lib/s3';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    
    const images = await listImages(prefix);
    
    const response = NextResponse.json({
      success: true,
      images,
      count: images.length,
    });

    // Let Next.js handle caching with its defaults
    // Next.js 15: GET route handlers are not cached by default (which is perfect for dynamic S3 data)
    response.headers.set('Vary', 'Accept-Encoding');
    
    return response;
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch images',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 