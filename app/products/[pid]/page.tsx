// app/products/[pid]/page.tsx
import { notFound } from 'next/navigation';
import ProductImages from '@/components/ProductImages';
import ProductInfo from '@/components/ProductInfo';
import AddToCartButton from '@/components/AddToCartButton';
import RelatedProducts from '@/components/RelatedProducts';
import { getProduct } from '@/lib/cj-api';

interface ProductPageProps {
  params: Promise<{ pid: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { pid } = await params;
  
  // Fetch product data
  const productResponse = await getProduct(pid);
  
  if (!productResponse.success || !productResponse.data) {
    notFound();
  }
  
  const product = productResponse.data;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-primary-600">Home</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <a href="/products" className="hover:text-primary-600">Products</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">{product.productName}</span>
            </li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <ProductImages 
                images={product.productImages || [product.productImage]}
                productName={product.productName}
              />
            </div>
            
            {/* Product Info */}
            <div>
              <ProductInfo product={product} />
              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="bg-white rounded-lg shadow-sm mt-8 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.productDescription || product.productDescriptionEn || 'No description available.'}
            </p>
          </div>
          
          {/* Product Specifications */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Weight:</dt>
                  <dd className="text-gray-900">{product.productWeight}kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="text-gray-900">{product.categoryName}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Info</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Package Weight:</dt>
                  <dd className="text-gray-900">{product.packWeight}kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dimensions:</dt>
                  <dd className="text-gray-900">
                    {product.packLength} × {product.packWidth} × {product.packHeight} cm
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts 
            categoryId={product.categoryId} 
            currentProductId={product.pid} 
          />
        </div>
      </div>
    </div>
  );
}