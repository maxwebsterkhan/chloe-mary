import { NextRequest, NextResponse } from 'next/server';
import { listImages } from '@/lib/s3';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    
    const images = await listImages(prefix);
    
    return NextResponse.json({
      success: true,
      images,
      count: images.length,
    });
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