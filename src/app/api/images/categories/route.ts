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

    // Add cache headers - Cache for 1 week, stale-while-revalidate for 1 day
    response.headers.set('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=86400');
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