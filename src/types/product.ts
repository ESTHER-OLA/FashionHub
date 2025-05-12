export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subCategory: string;
  description: string;
  features?: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isSale?: boolean;
  gender?: "men" | "women" | "children" | "unisex";
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  status: "active" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  shipperName?: string;
  trackingUrl?: string; 
  additionalNotes?: string; 
  trackingNumber?: string; 
  currentStatus?: string; 
  estimatedDelivery?: string; 
}
