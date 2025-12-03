// =====================================================
// Website Product Types (from website_products table)
// =====================================================

// Database type for website_products table
export interface DbWebsiteProduct {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  hover_image_url: string | null;
  gallery_urls: string[];
  category: string;
  tags: string[];
  badge: string | null;
  available_colors: string[];
  available_sizes: string[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  inventory_product_id: string | null;
  inventory_sku: string | null;
  view_count: number;
  order_count: number;
  created_at: string;
  updated_at: string;
}

// Frontend Product type for display
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  image: string;
  hoverImage?: string;
  galleryImages?: string[];
  category: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: string;
  slug?: string;
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  // For order tracking
  inventoryProductId?: string | null;
  inventorySku?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Transform DB website product to frontend Product type
export function mapWebsiteProductToProduct(dbProduct: DbWebsiteProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
    originalPrice: dbProduct.compare_price || undefined,
    description: dbProduct.description || '',
    shortDescription: dbProduct.short_description || undefined,
    image: dbProduct.image_url || '/images/products/placeholder.jpg',
    hoverImage: dbProduct.hover_image_url || undefined,
    galleryImages: dbProduct.gallery_urls || [],
    category: dbProduct.category || 'Uncategorized',
    colors: dbProduct.available_colors || [],
    sizes: dbProduct.available_sizes || [],
    rating: 4.8, // Default rating
    reviews: dbProduct.order_count || 0,
    badge: dbProduct.badge || undefined,
    slug: dbProduct.slug || undefined,
    tags: dbProduct.tags || [],
    isActive: dbProduct.is_active,
    isFeatured: dbProduct.is_featured,
    inventoryProductId: dbProduct.inventory_product_id,
    inventorySku: dbProduct.inventory_sku,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'esewa' | 'khalti';

export interface OrderAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  landmark?: string;
}

export interface OrderItem {
  websiteProductId: string;
  inventoryProductId?: string | null;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  address: OrderAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Legacy support for old DbProduct type (can be removed later)
export interface DbProduct {
  id: string;
  name: string;
  sku: string | null;
  description: string | null;
  category: string | null;
  base_price: number;
  sale_price: number | null;
  cost_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  track_inventory: boolean;
  weight: number | null;
  weight_unit: string | null;
  dimensions: Record<string, unknown> | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  is_active: boolean;
  is_featured: boolean;
  has_variations: boolean;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  vendor_id: string | null;
  vendor_name: string | null;
  vendor_sku: string | null;
  website_title: string | null;
  website_description: string | null;
  show_on_website: boolean;
  website_badge: string | null;
  website_colors: string[] | null;
  website_hover_image: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

// Legacy mapper (for backward compatibility)
export function mapDbProductToProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.website_title || dbProduct.name,
    price: dbProduct.sale_price || dbProduct.base_price,
    originalPrice: dbProduct.sale_price ? dbProduct.base_price : undefined,
    description: dbProduct.website_description || dbProduct.description || '',
    image: dbProduct.image_url || '/images/products/placeholder.jpg',
    hoverImage: dbProduct.website_hover_image || (dbProduct.gallery_urls?.[0] ?? undefined),
    category: dbProduct.category || 'Uncategorized',
    colors: dbProduct.website_colors || [],
    sizes: [],
    rating: 4.8,
    reviews: 0,
    badge: dbProduct.website_badge || undefined,
    isActive: dbProduct.is_active && dbProduct.show_on_website,
    isFeatured: dbProduct.is_featured,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}
