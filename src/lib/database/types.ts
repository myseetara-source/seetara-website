/**
 * Database Types for Seetara Website
 * These types match the shared Supabase database schema (from ERP)
 */

// ===== Product Types =====
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
  variation_attributes: VariationAttribute[] | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  vendor_id: string | null;
  vendor_name: string | null;
  vendor_sku: string | null;
  // Website-specific fields (to be added to schema)
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

export interface VariationAttribute {
  name: string;
  values: string[];
}

export interface DbProductVariation {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  attributes: Record<string, string>;
  price: number;
  cost_price: number | null;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ===== Order Types =====
export type OrderValley = 'INSIDE' | 'OUTSIDE' | 'STORE' | 'WEBSITE';
export type OrderSource = 'manual' | 'website' | 'api' | 'bulk_import';

export interface DbOrder {
  id: number;
  order_id: string;
  customer_name: string;
  cell_number: string;
  alternative_number: string | null;
  full_address: string;
  valley: OrderValley | null;
  branch: string | null;
  product: string;
  product_details: Record<string, unknown> | null;
  cash_on_delivery: number;
  pre_payment: number;
  discount: number;
  total_amount: number;
  status: string;
  status_history: StatusHistoryItem[] | null;
  delivery_assignment: string | null;
  rider_id: string | null;
  assigned_by: string | null;
  assigned_at: string | null;
  logistics_provider: string | null;
  tracking_id: string | null;
  logistics_details: Record<string, unknown> | null;
  followup: string | null;
  comment_history: DbOrderComment[] | null;
  source: OrderSource;
  website_client_id: string | null;
  external_order_id: string | null;
  external_order_url: string | null;
  customer_id: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  delivered_at: string | null;
  cancelled_at: string | null;
}

export interface StatusHistoryItem {
  from: string;
  to: string;
  changed_at: string;
  changed_by: string | null;
}

export interface DbOrderComment {
  id: string;
  type: string;
  message: string;
  author: string;
  userId: string;
  source: string;
  visibility: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// ===== Website Settings Types =====
export interface DbWebsiteSettings {
  id: string;
  setting_key: string;
  setting_value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface HomeBanner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface FeaturedProductConfig {
  product_id: string;
  sort_order: number;
}

// ===== Database Schema Type (for Supabase client) =====
export interface Database {
  public: {
    Tables: {
      products: {
        Row: DbProduct;
        Insert: Partial<DbProduct> & { name: string };
        Update: Partial<DbProduct>;
      };
      product_variations: {
        Row: DbProductVariation;
        Insert: Partial<DbProductVariation> & {
          product_id: string;
          name: string;
          price: number;
        };
        Update: Partial<DbProductVariation>;
      };
      product_categories: {
        Row: DbProductCategory;
        Insert: Partial<DbProductCategory> & { name: string; slug: string };
        Update: Partial<DbProductCategory>;
      };
      orders: {
        Row: DbOrder;
        Insert: Partial<DbOrder> & {
          order_id: string;
          customer_name: string;
          cell_number: string;
          full_address: string;
          product: string;
        };
        Update: Partial<DbOrder>;
      };
      website_settings: {
        Row: DbWebsiteSettings;
        Insert: Partial<DbWebsiteSettings> & { setting_key: string };
        Update: Partial<DbWebsiteSettings>;
      };
    };
  };
}

// Helper type to extract Row type from a table
export type TableRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

// Helper type to extract Insert type from a table
export type TableInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

