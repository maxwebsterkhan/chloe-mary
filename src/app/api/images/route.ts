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

    // Add caching headers - Cache for 1 week, stale-while-revalidate for 1 day
    response.headers.set('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=86400');
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