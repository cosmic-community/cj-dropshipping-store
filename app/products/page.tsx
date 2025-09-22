import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const sortBy = typeof params.sort === 'string' ? params.sort : undefined;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">
            Discover thousands of products from trusted suppliers
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar initialValue={search} />
        </div>
        
        {/* Filters and Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded"></div>}>
                <ProductFilters 
                  currentCategory={category}
                  currentSort={sortBy}
                />
              </Suspense>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductGrid 
                search={search}
                category={category}
                sortBy={sortBy}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}