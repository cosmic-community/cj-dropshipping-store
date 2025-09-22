import { CJProduct } from '@/types';
import { formatPrice } from '@/lib/cj-api';

interface ProductInfoProps {
  product: CJProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const discount = product.listPrice > product.sellPrice 
    ? Math.round(((product.listPrice - product.sellPrice) / product.listPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.productNameEn || product.productName}
        </h1>
        <p className="text-gray-600">
          Category: <span className="font-medium">{product.categoryName}</span>
        </p>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.sellPrice)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.listPrice)}
              </span>
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Price includes shipping and handling
        </p>
      </div>

      {/* Product Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Available Options</h3>
          <div className="grid grid-cols-2 gap-3">
            {product.variants.map((variant) => (
              <div 
                key={variant.vid}
                className="border border-gray-200 rounded-lg p-3 hover:border-primary-300 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {variant.variantKey}: {variant.variantValue}
                    </p>
                    <p className="text-sm text-gray-600">
                      SKU: {variant.productSku}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(variant.variantSellPrice)}
                    </p>
                    <p className="text-xs text-green-600">
                      In Stock: {variant.variantStock}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="text-gray-900 font-medium">{product.productWeight}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Package Weight:</span>
              <span className="text-gray-900 font-medium">{product.packWeight}kg</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Dimensions:</span>
              <span className="text-gray-900 font-medium">
                {product.packLength} × {product.packWidth} × {product.packHeight} cm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="text-gray-900 font-medium">{product.categoryName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-gray-900">Key Features</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Fast Processing
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Quality Guaranteed
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Worldwide Shipping
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
}