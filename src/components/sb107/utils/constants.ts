import { getImageUrl } from '../config/r2Config';

export const productColors = ['Maroon', 'Coffee', 'Black', 'Brown'];

// Product SKU - Single product name for all colors
export const PRODUCT_SKU = 'Seetara Golden Chain Bag';

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
  'Brown': { 
    id: 1, 
    hex: '#A0522D', // Sienna brown - rich saturated
    image: getImageUrl('Brown'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Brown',
    labelNp: 'खैरो (Brown)'
  },
  'Black': { 
    id: 2, 
    hex: '#1A1A1A', // Deep black
    image: getImageUrl('Black'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Black',
    labelNp: 'कालो (Black)'
  },
  'Maroon': { 
    id: 3, 
    hex: '#8B0000', // Dark red - rich maroon
    image: getImageUrl('Maroon'), 
    price: 1499, 
    originalPrice: 2100, 
    label: 'Maroon',
    labelNp: 'मरुन (Maroon)'
  },
  'Coffee': { 
    id: 4, 
    hex: '#6F4E37', // True coffee brown - saturated
    image: getImageUrl('Coffee'), 
    price: 1499, 
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
