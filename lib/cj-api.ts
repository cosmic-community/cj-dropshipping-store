import { CJProduct, CJProductResponse, ApiResponse } from '@/types';

const CJ_API_KEY = process.env.CJ_API_KEY;
const CJ_API_BASE_URL = process.env.CJ_API_BASE_URL || 'https://developers.cjdropshipping.com/api2.0';

if (!CJ_API_KEY) {
  console.error('CJ_API_KEY is not configured');
}

interface CJApiRequest {
  method: string;
  endpoint: string;
  data?: Record<string, any>;
}

async function makeRequest<T>({ method, endpoint, data }: CJApiRequest): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (CJ_API_KEY) {
      headers['CJ-Access-Token'] = CJ_API_KEY;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    let url = `${CJ_API_BASE_URL}${endpoint}`;
    if (data && method === 'GET') {
      const params = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: result.result || false,
      data: result.data || result,
      message: result.message,
    };
  } catch (error) {
    console.error('CJ API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Get products with optional filters
export async function getProducts(params: {
  pageNum?: number;
  pageSize?: number;
  categoryId?: string;
  keywords?: string;
  sort?: string;
} = {}): Promise<ApiResponse<CJProductResponse['data']>> {
  return makeRequest<CJProductResponse['data']>({
    method: 'GET',
    endpoint: '/product/list',
    data: {
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 20,
      categoryId: params.categoryId,
      keywords: params.keywords,
      sort: params.sort,
    },
  });
}

// Get single product details
export async function getProduct(pid: string): Promise<ApiResponse<CJProduct>> {
  return makeRequest<CJProduct>({
    method: 'GET',
    endpoint: '/product/query',
    data: { pid },
  });
}

// Get product categories
export async function getCategories(): Promise<ApiResponse<any[]>> {
  return makeRequest<any[]>({
    method: 'GET',
    endpoint: '/product/getCategory',
  });
}

// Search products
export async function searchProducts(
  keyword: string,
  options: {
    pageNum?: number;
    pageSize?: number;
    categoryId?: string;
  } = {}
): Promise<ApiResponse<CJProductResponse['data']>> {
  return getProducts({
    keywords: keyword,
    ...options,
  });
}

// Helper function to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Helper function to generate product image URL
export function getProductImageUrl(imagePath: string): string {
  if (!imagePath) return '/placeholder-product.jpg';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Handle relative URLs from CJ API
  return imagePath.startsWith('/') ? `https://cjdropshipping.com${imagePath}` : imagePath;
}

// Mock data for development/fallback
export const mockProducts: CJProduct[] = [
  {
    pid: '1',
    productName: 'Wireless Bluetooth Headphones',
    productNameEn: 'Wireless Bluetooth Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
    ],
    sellPrice: 29.99,
    listPrice: 59.99,
    productWeight: 0.3,
    categoryId: 1,
    categoryName: 'Electronics',
    productDescription: 'High-quality wireless Bluetooth headphones with noise cancellation.',
    productDescriptionEn: 'High-quality wireless Bluetooth headphones with noise cancellation.',
    packWeight: 0.5,
    packLength: 20,
    packWidth: 15,
    packHeight: 8,
  },
  {
    pid: '2',
    productName: 'Smart Fitness Watch',
    productNameEn: 'Smart Fitness Watch',
    productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop'
    ],
    sellPrice: 79.99,
    listPrice: 149.99,
    productWeight: 0.1,
    categoryId: 1,
    categoryName: 'Electronics',
    productDescription: 'Track your fitness goals with this advanced smart watch.',
    productDescriptionEn: 'Track your fitness goals with this advanced smart watch.',
    packWeight: 0.2,
    packLength: 15,
    packWidth: 10,
    packHeight: 5,
  },
  {
    pid: '3',
    productName: 'Portable Phone Charger',
    productNameEn: 'Portable Phone Charger',
    productImage: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop'
    ],
    sellPrice: 19.99,
    listPrice: 39.99,
    productWeight: 0.2,
    categoryId: 1,
    categoryName: 'Electronics',
    productDescription: 'Compact portable charger for your mobile devices.',
    productDescriptionEn: 'Compact portable charger for your mobile devices.',
    packWeight: 0.3,
    packLength: 12,
    packWidth: 8,
    packHeight: 3,
  },
];