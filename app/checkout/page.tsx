'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCart } from '@/contexts/CartContext';
import { CheckoutForm } from '@/types';
import { formatPrice } from '@/lib/cj-api';
import CheckoutSummary from '@/components/CheckoutSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();
  
  // Redirect if cart is empty
  if (cart.items.length === 0) {
    router.push('/cart');
    return null;
  }
  
  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order ID
      const orderNumber = `CJ${Date.now()}`;
      
      // In a real app, you would send this data to your backend
      const orderData = {
        orderNumber,
        items: cart.items,
        shipping: data,
        total: cart.total,
        createdAt: new Date().toISOString(),
      };
      
      // Store order data temporarily (in real app, this would be in your database)
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      clearCart();
      
      // Redirect to confirmation
      router.push(`/checkout/confirmation?order=${orderNumber}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Please fill in your shipping details</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input-field"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <p className="form-error">{errors.firstName.message}</p>
                  )}
                </div>
                
                {/* Last Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input-field"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <p className="form-error">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input-field"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              {/* Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="address"
                  className="input-field"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && (
                  <p className="form-error">{errors.address.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City */}
                <div className="form-group">
                  <label className="form-label" htmlFor="city">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="input-field"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="form-error">{errors.city.message}</p>
                  )}
                </div>
                
                {/* State */}
                <div className="form-group">
                  <label className="form-label" htmlFor="state">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="input-field"
                    {...register('state', { required: 'State is required' })}
                  />
                  {errors.state && (
                    <p className="form-error">{errors.state.message}</p>
                  )}
                </div>
                
                {/* ZIP Code */}
                <div className="form-group">
                  <label className="form-label" htmlFor="zipCode">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    className="input-field"
                    {...register('zipCode', { required: 'ZIP code is required' })}
                  />
                  {errors.zipCode && (
                    <p className="form-error">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
              
              {/* Country */}
              <div className="form-group">
                <label className="form-label" htmlFor="country">
                  Country *
                </label>
                <select
                  id="country"
                  className="input-field"
                  {...register('country', { required: 'Country is required' })}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="JP">Japan</option>
                  <option value="KR">South Korea</option>
                </select>
                {errors.country && (
                  <p className="form-error">{errors.country.message}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Processing Order...
                    </span>
                  ) : (
                    `Place Order - ${formatPrice(cart.total)}`
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}