import { getImageUrl } from '../config/r2Config';

export const productColors = ['Olive', 'Brown', 'Coffee', 'Black', 'Maroon'];

// Product SKU - Single product name for all colors
export const PRODUCT_SKU = 'SB104';

export interface Product {
  id: number;
  hex: string;
  image: string;
  price: number;
  originalPrice: number;
  label: string;
  labelNp: string;
}

export const products: Record<string, Product> = {
  'Olive': { 
    id: 1, 
    hex: '#6B7B3F',
    image: getImageUrl('Olive'), 
    price: 1799, 
    originalPrice: 2499, 
    label: 'Olive',
    labelNp: 'हरियो (Olive)'
  },
  'Brown': { 
    id: 2, 
    hex: '#8B4513',
    image: getImageUrl('Brown'), 
    price: 1799, 
    originalPrice: 2499, 
    label: 'Brown',
    labelNp: 'खैरो (Brown)'
  },
  'Coffee': { 
    id: 3, 
    hex: '#6F4E37',
    image: getImageUrl('Coffee'), 
    price: 1799, 
    originalPrice: 2499, 
    label: 'Coffee',
    labelNp: 'कफी (Coffee)'
  },
  'Black': { 
    id: 4, 
    hex: '#1A1A1A',
    image: getImageUrl('Black'), 
    price: 1799, 
    originalPrice: 2499, 
    label: 'Black',
    labelNp: 'कालो (Black)'
  },
  'Maroon': { 
    id: 5, 
    hex: '#800020',
    image: getImageUrl('Maroon'), 
    price: 1799, 
    originalPrice: 2499, 
    label: 'Maroon',
    labelNp: 'मरुन (Maroon)'
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

// Product Features for this multi-functional bag
export const productFeatures = [
  {
    id: 'compartments',
    title: '5-Compartment System',
    titleNp: '५ भाग प्रणाली',
    description: 'Everything has its place - organized life starts here',
    icon: 'Grid3X3'
  },
  {
    id: 'main',
    title: 'Spacious Main Section',
    titleNp: 'ठूलो मुख्य भाग',
    description: 'Documents, notebooks, or a change of clothes',
    icon: 'Package'
  },
  {
    id: 'internal',
    title: 'Internal Pockets',
    titleNp: 'भित्री झोलाहरू',
    description: 'Makeup, power bank, and chargers stay organized',
    icon: 'Layers'
  },
  {
    id: 'secure',
    title: 'Secure Zip Pocket',
    titleNp: 'सुरक्षित जिप पकेट',
    description: 'Your wallet and keys are always safe',
    icon: 'Lock'
  },
  {
    id: 'quick',
    title: 'Quick-Access Pocket',
    titleNp: 'छिटो पहुँच पकेट',
    description: 'Phone or transit pass in a flash',
    icon: 'Zap'
  },
  {
    id: 'smart',
    title: '2-in-1 Smart Pocket',
    titleNp: '२-इन-१ स्मार्ट पकेट',
    description: 'Anti-theft pocket + Luggage sleeve in one!',
    icon: 'Sparkles'
  }
];

