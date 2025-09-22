// Product interfaces for CJ Dropshipping API
export interface CJProduct {
  pid: string;
  productName: string;
  productNameEn: string;
  productImage: string;
  productImages: string[];
  sellPrice: number;
  listPrice: number;
  productWeight: number;
  categoryId: number;
  categoryName: string;
  productDescription: string;
  productDescriptionEn: string;
  packWeight: number;
  packLength: number;
  packWidth: number;
  packHeight: number;
  variants?: CJVariant[];
}

export interface CJVariant {
  vid: string;
  productSku: string;
  variantKey: string;
  variantValue: string;
  variantImage: string;
  variantSellPrice: number;
  variantListPrice: number;
  variantStock: number;
}

export interface CJProductResponse {
  result: boolean;
  message: string;
  data: {
    list: CJProduct[];
    total: number;
    pageNum: number;
    pageSize: number;
  };
}

// Shopping Cart interfaces
export interface CartItem {
  id: string;
  pid: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    vid: string;
    sku: string;
    key: string;
    value: string;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Cart context actions
export interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Checkout form interface
export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Order interface
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shipping: CheckoutForm;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Product filters
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}