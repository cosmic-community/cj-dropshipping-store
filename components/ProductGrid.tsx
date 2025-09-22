'use client';

import { useEffect, useState } from 'react';
import { CJProduct } from '@/types';
import { getProducts, mockProducts } from '@/lib/cj-api';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProductGridProps {
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
}

export default function ProductGrid({ limit, search, category, sortBy }: ProductGridProps) {
  const [products, setProducts] = useState<CJProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Try to fetch from CJ API first
        const response = await getProducts({
          pageSize: limit || 20,
          keywords: search,
          categoryId: category,
        });
        
        if (response.success && response.data) {
          let productList = response.data.list || [];
          
          // Apply sorting
          if (sortBy) {
            productList = [...productList].sort((a, b) => {
              switch (sortBy) {
                case 'price_asc':
                  return a.sellPrice - b.sellPrice;
                case 'price_desc':
                  return b.sellPrice - a.sellPrice;
                case 'name_asc':
                  return a.productName.localeCompare(b.productName);
                case 'name_desc':
                  return b.productName.localeCompare(a.productName);
                default:
                  return 0;
              }
            });
          }
          
          setProducts(productList);
        } else {
          // Fallback to mock data
          console.warn('Using mock data as fallback');
          let productList = [...mockProducts];
          
          // Apply search filter
          if (search) {
            productList = productList.filter(product =>
              product.productName.toLowerCase().includes(search.toLowerCase())
            );
          }
          
          // Apply sorting to mock data
          if (sortBy) {
            productList = productList.sort((a, b) => {
              switch (sortBy) {
                case 'price_asc':
                  return a.sellPrice - b.sellPrice;
                case 'price_desc':
                  return b.sellPrice - a.sellPrice;
                case 'name_asc':
                  return a.productName.localeCompare(b.productName);
                case 'name_desc':
                  return b.productName.localeCompare(a.productName);
                default:
                  return 0;
              }
            });
          }
          
          // Apply limit
          if (limit) {
            productList = productList.slice(0, limit);
          }
          
          setProducts(productList);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        
        // Use mock data as ultimate fallback
        setProducts(mockProducts.slice(0, limit || mockProducts.length));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [limit, search, category, sortBy]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filters.</p>
      </div>
    );
  }
  
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.pid} product={product} />
      ))}
    </div>
  );
}