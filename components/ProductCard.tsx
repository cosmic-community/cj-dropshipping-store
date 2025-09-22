import Link from 'next/link';
import { CJProduct } from '@/types';
import { formatPrice, getProductImageUrl } from '@/lib/cj-api';

interface ProductCardProps {
  product: CJProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductImageUrl(product.productImage);
  const hasDiscount = product.listPrice > product.sellPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((product.listPrice - product.sellPrice) / product.listPrice) * 100)
    : 0;
  
  return (
    <div className="card card-hover group">
      <Link href={`/products/${product.pid}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={300}
            height={300}
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercent}%
            </div>
          )}
          
          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              Quick View
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-sm text-primary-600 font-medium mb-1">
            {product.categoryName}
          </p>
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.productName}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.sellPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.listPrice)}
              </span>
            )}
          </div>
          
          {/* Rating/Reviews Placeholder */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">(124)</span>
          </div>
          
          {/* Add to Cart Button */}
          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}