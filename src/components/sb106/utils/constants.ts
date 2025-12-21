import { getImageUrl } from '../config/r2Config';

export const productColors = ['Maroon', 'Coffee', 'Black', 'Brown'];

// Product SKU - Single product name for all colors
export const PRODUCT_SKU = 'Seetara Viral Chain Bag';

export interface Product {
  id: number;
  hex: string;
  image: string;
  price: number;
  originalPrice: number;
  label: string;
}

export const products: Record<string, Product> = {
  'Brown': { 
    id: 1, 
    hex: '#8B5A2B', 
    image: getImageUrl('Brown'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Brown'
  },
  'Black': { 
    id: 2, 
    hex: '#222222', 
    image: getImageUrl('Black'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Black'
  },
  'Maroon': { 
    id: 3, 
    hex: '#800000', 
    image: getImageUrl('Maroon'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Maroon'
  },
  'Coffee': { 
    id: 4, 
    hex: '#5D4037', 
    image: getImageUrl('Coffee'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Coffee'
  }
};

export const fakeNames = ["Sita", "Rita", "Gita", "Sarmila", "Anjali", "Pooja", "Nabina", "Rabina"];
export const fakeCities = ["Kathmandu", "Pokhara", "Butwal", "Dharan", "Chitwan", "Biratnagar"];

