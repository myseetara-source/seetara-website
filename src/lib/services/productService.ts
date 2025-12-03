import { createClient } from '@/lib/supabase/server';
import type { DbWebsiteProduct, Product } from '@/types';
import { mapWebsiteProductToProduct } from '@/types';

/**
 * Fetch all active website products
 */
export async function getWebsiteProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('website_products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching website products:', error);
    return [];
  }

  return (data as DbWebsiteProduct[]).map(mapWebsiteProductToProduct);
}

/**
 * Fetch featured products for the homepage
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('website_products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(6);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return (data as DbWebsiteProduct[]).map(mapWebsiteProductToProduct);
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('website_products')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return (data as DbWebsiteProduct[]).map(mapWebsiteProductToProduct);
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('website_products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    console.error('Error fetching product:', error);
    return null;
  }

  return mapWebsiteProductToProduct(data as DbWebsiteProduct);
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('website_products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    console.error('Error fetching product by slug:', error);
    return null;
  }

  return mapWebsiteProductToProduct(data as DbWebsiteProduct);
}

/**
 * Fetch all product categories that have active products
 */
export async function getActiveCategories(): Promise<string[]> {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('website_products')
    .select('category')
    .eq('is_active', true)
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Get unique categories
  const categories = [...new Set((data || []).map((p: { category: string }) => p.category).filter(Boolean))] as string[];
  return categories;
}

/**
 * Increment view count for a product
 */
export async function incrementProductViews(productId: string): Promise<void> {
  const supabase = await createClient();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).rpc('increment_view_count', {
      product_id: productId,
    });

    if (error) {
      console.error('Error incrementing view count:', error);
    }
  } catch (err) {
    console.log('increment_view_count RPC not available:', err);
  }
}
