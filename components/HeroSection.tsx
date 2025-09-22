import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Discover Amazing Products at{' '}
              <span className="text-primary-200">Unbeatable Prices</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Shop thousands of quality products from trusted suppliers worldwide. 
              Fast shipping, secure checkout, and exceptional customer service guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
              >
                Shop Now
              </Link>
              <Link 
                href="#features" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-500">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-primary-200">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-primary-200">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-primary-200">Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square bg-white bg-opacity-10 rounded-3xl p-8">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&auto=format,compress"
                alt="Online Shopping"
                className="w-full h-full object-cover rounded-2xl"
                width={600}
                height={600}
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm animate-bounce">
              Free Shipping
            </div>
            <div className="absolute -bottom-6 -right-6 bg-green-400 text-green-900 px-4 py-2 rounded-full font-semibold text-sm animate-pulse">
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}