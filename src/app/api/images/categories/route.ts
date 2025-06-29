import { NextResponse } from 'next/server';
import { getImagesByCategory } from '@/lib/s3';

export async function GET() {
  try {
    const categorizedImages = await getImagesByCategory();
    
    const response = NextResponse.json({
      success: true,
      categories: categorizedImages,
      categoryCount: Object.keys(categorizedImages).length,
    });

    // Add cache headers for better performance
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    response.headers.set('Vary', 'Accept-Encoding');
    
    return response;
  } catch (error) {
    console.error('Error fetching categorized images:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categorized images',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 