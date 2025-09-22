'use client';

import { Cart } from '@/types';
import { formatPrice } from '@/lib/cj-api';

interface CheckoutSummaryProps {
  cart: Cart;
}

export default function CheckoutSummary({ cart }: CheckoutSummaryProps) {
  const shipping = 0; // Free shipping for now
  const tax = cart.total * 0.08; // 8% tax
  const finalTotal = cart.total + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Items List */}
      <div className="space-y-3 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div className="flex-1">
              <p className="text-gray-900 font-medium truncate">{item.name}</p>
              {item.variant && (
                <p className="text-gray-600 text-xs">
                  {item.variant.key}: {item.variant.value}
                </p>
              )}
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-gray-900 font-medium ml-4">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      
      <hr className="border-gray-200 mb-4" />
      
      {/* Pricing Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-900">{formatPrice(cart.total)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="text-gray-900">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax:</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">Total:</span>
          <span className="text-gray-900">{formatPrice(finalTotal)}</span>
        </div>
      </div>
      
      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg 
            className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>Secure SSL encrypted checkout</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <svg 
            className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
            />
          </svg>
          <span>Multiple payment methods accepted</span>
        </div>
      </div>
    </div>
  );
}