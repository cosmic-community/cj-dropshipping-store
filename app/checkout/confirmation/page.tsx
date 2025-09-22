'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Order } from '@/types';
import { formatPrice } from '@/lib/cj-api';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch order data from your API
    const loadOrder = () => {
      try {
        const orderData = localStorage.getItem('lastOrder');
        if (orderData && orderNumber) {
          const parsedOrder = JSON.parse(orderData);
          if (parsedOrder.orderNumber === orderNumber) {
            setOrder(parsedOrder);
          }
        }
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOrder();
  }, [orderNumber]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the order you're looking for.
            </p>
            <Link href="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-10 h-10 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-lg font-mono font-semibold text-gray-900">
                  {order.orderNumber}
                </p>
              </div>
            </div>
          </div>
          
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.variant && (
                      <p className="text-sm text-gray-600">
                        {item.variant.key}: {item.variant.value}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
          
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Shipping Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-900">
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p className="text-gray-600">{order.shipping.address}</p>
              <p className="text-gray-600">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
              </p>
              <p className="text-gray-600">{order.shipping.country}</p>
              <p className="text-gray-600">{order.shipping.email}</p>
              <p className="text-gray-600">{order.shipping.phone}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="text-center space-x-4">
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="btn-outline"
            >
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}