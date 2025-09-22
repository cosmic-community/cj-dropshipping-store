'use client';

import { useState } from 'react';
import { CJProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  product: CJProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      let variant = undefined;
      let price = product.sellPrice;
      
      // If variants exist and one is selected, use variant data
      if (product.variants && product.variants.length > 0 && selectedVariant) {
        const selected = product.variants.find(v => v.vid === selectedVariant);
        if (selected) {
          variant = {
            vid: selected.vid,
            sku: selected.productSku,
            key: selected.variantKey,
            value: selected.variantValue,
          };
          price = selected.variantSellPrice;
        }
      }

      // Add item to cart
      addToCart({
        pid: product.pid,
        name: product.productNameEn || product.productName,
        price: price,
        image: product.productImage,
        quantity: quantity,
        variant: variant,
      });

      // Show success feedback
      setIsAdding(false);
      
      // Optional: Show success toast/notification
      // You could add a toast library here
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  // Check if variants exist but none selected
  const hasVariants = product.variants && product.variants.length > 0;
  const canAddToCart = !hasVariants || selectedVariant;

  return (
    <div className="space-y-4">
      {/* Variant Selection */}
      {hasVariants && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-900">
            Select Option
          </label>
          <div className="grid grid-cols-1 gap-2">
            {product.variants.map((variant) => (
              <label 
                key={variant.vid}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedVariant === variant.vid
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="variant"
                    value={variant.vid}
                    checked={selectedVariant === variant.vid}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      {variant.variantKey}: {variant.variantValue}
                    </span>
                    <div className="text-sm text-gray-600">
                      SKU: {variant.productSku}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ${variant.variantSellPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-green-600">
                    Stock: {variant.variantStock}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!canAddToCart || isAdding}
        className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-colors ${
          canAddToCart && !isAdding
            ? 'bg-primary-600 hover:bg-primary-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <div className="spinner mr-2"></div>
            Adding to Cart...
          </span>
        ) : hasVariants && !selectedVariant ? (
          'Select an Option'
        ) : (
          'Add to Cart'
        )}
      </button>

      {/* Buy Now Button */}
      <button
        disabled={!canAddToCart || isAdding}
        className={`w-full py-4 px-6 rounded-lg font-medium border-2 transition-colors ${
          canAddToCart && !isAdding
            ? 'border-primary-600 text-primary-600 hover:bg-primary-50'
            : 'border-gray-300 text-gray-400 cursor-not-allowed'
        }`}
      >
        Buy Now
      </button>
    </div>
  );
}