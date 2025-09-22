import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/cj-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const pageNum = parseInt(searchParams.get('pageNum') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const keywords = searchParams.get('keywords') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;
    const sort = searchParams.get('sort') || undefined;
    
    const response = await getProducts({
      pageNum,
      pageSize,
      keywords,
      categoryId,
      sort,
    });
    
    if (!response.success) {
      return NextResponse.json(
        { error: response.error || 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}