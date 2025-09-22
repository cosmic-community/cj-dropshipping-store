'use client';

import { useState } from 'react';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Ensure we have at least one image
  const imageList = images && images.length > 0 ? images : [''];
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={imageList[activeImageIndex] || '/placeholder-product.jpg'}
          alt={productName}
          width={600}
          height={600}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      {/* Image Thumbnails */}
      {imageList.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                index === activeImageIndex 
                  ? 'border-primary-600' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image || '/placeholder-product.jpg'}
                alt={`${productName} view ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Image Counter */}
      {imageList.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          {activeImageIndex + 1} of {imageList.length}
        </div>
      )}
    </div>
  );
}