import { getProducts } from '@/lib/cj-api';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  categoryId: number;
  currentProductId: string;
}

export default async function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  // Fetch products from the same category
  const response = await getProducts({ 
    categoryId: categoryId.toString(), 
    pageNum: 1, 
    pageSize: 8 
  });

  if (!response.success || !response.data?.list) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No related products found.</p>
      </div>
    );
  }

  // Filter out the current product and limit to 4 items
  const relatedProducts = response.data.list
    .filter(product => product.pid !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No related products found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Products</h2>
        <p className="text-gray-600">You might also be interested in these products</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.pid} product={product} />
        ))}
      </div>
    </div>
  );
}