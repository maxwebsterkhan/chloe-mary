import { NextRequest, NextResponse } from 'next/server';
import { getImageUrl } from '@/lib/s3';

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const { searchParams } = new URL(request.url);
    const expiresIn = parseInt(searchParams.get('expires') || '3600');
    
    // Decode the key in case it was URL encoded
    const decodedKey = decodeURIComponent(key);
    
    const url = await getImageUrl(decodedKey, expiresIn);
    
    return NextResponse.json({
      success: true,
      key: decodedKey,
      url,
      expiresIn,
    });
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