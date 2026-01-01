import { getImageUrl } from '../config/r2Config';

export const productColors = ['Maroon', 'Black', 'Coffee'];

// Product SKU - Single product name for all colors
export const PRODUCT_SKU = 'Seetara Luna Bag';

export interface Product {
  id: number;
  hex: string;
  image: string;
  price: number;
  originalPrice: number;
  label: string;
  labelNp: string; // Nepali label in Devanagari
}

export const products: Record<string, Product> = {
  'Maroon': { 
    id: 1, 
    hex: '#8B2942', // Deep maroon red
    image: getImageUrl('Maroon'), 
    price: 1800, 
    originalPrice: 2100, 
    label: 'Maroon',
    labelNp: 'मरुन (Maroon)'
  },
  'Black': { 
    id: 2, 
    hex: '#1A1A1A', // Deep black
    image: getImageUrl('Black'), 
    price: 1800, 
    originalPrice: 2100, 
    label: 'Black',
    labelNp: 'कालो (Black)'
  },
  'Coffee': { 
    id: 3, 
    hex: '#4A3728', // Rich coffee brown
    image: getImageUrl('Coffee'), 
    price: 1800, 
    originalPrice: 2100, 
    label: 'Coffee',
    labelNp: 'कफी (Coffee)'
  }
};

// English names for social proof notifications
export const fakeNames = [
  "Sita", "Rita", "Gita", "Sarmila", "Anjali", "Puja", "Nabina", "Rabina",
  "Sunita", "Anita", "Kamala", "Maya", "Shanti", "Parbati", "Laxmi", "Sarita",
  "Bindu", "Rekha", "Sabina", "Nisha", "Asha", "Mina", "Rama", "Durga",
  "Priya", "Sneha", "Kriti", "Asmita", "Bipana", "Shristi"
];

export const fakeCities = [
  "Kathmandu", "Pokhara", "Butwal", "Dharan", "Chitwan", "Biratnagar",
  "Birgunj", "Hetauda", "Nepalgunj", "Dhangadhi", "Itahari", "Janakpur",
  "Bhaktapur", "Lalitpur", "Damak", "Bharatpur", "Banepa", "Dhading"
];

export const fakeTimes = [
  "Just now", "1 min ago", "2 min ago", "5 min ago", "10 min ago", 
  "15 min ago", "30 min ago", "1 hr ago", "2 hr ago"
];

