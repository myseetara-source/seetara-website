import { getImageUrl } from '../config/r2Config';

export const productColors = ['Terracotta', 'Black', 'Coffee'];

// Product SKU - Single product name for all colors
export const PRODUCT_SKU = 'Seetara Smart Wallet';

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
  'Terracotta': { 
    id: 1, 
    hex: '#A0522D', // Terracotta/Brick red color
    image: getImageUrl('Terracotta'), 
    price: 1299, 
    originalPrice: 1999, 
    label: 'Terracotta',
    labelNp: 'इट्टाकोरङ (Terracotta)'
  },
  'Black': { 
    id: 2, 
    hex: '#1A1A1A', // Deep black
    image: getImageUrl('Black'), 
    price: 1299, 
    originalPrice: 1999, 
    label: 'Black',
    labelNp: 'कालो (Black)'
  },
  'Coffee': { 
    id: 3, 
    hex: '#4A3728', // Dark coffee brown
    image: getImageUrl('Coffee'), 
    price: 1299, 
    originalPrice: 1999, 
    label: 'Coffee',
    labelNp: 'कफी (Coffee)'
  }
};

// English names for social proof notifications
export const fakeNames = [
  "Sita", "Rita", "Gita", "Sarmila", "Anjali", "Puja", "Nabina", "Rabina",
  "Sunita", "Anita", "Kamala", "Maya", "Shanti", "Parbati", "Laxmi", "Sarita",
  "Bindu", "Rekha", "Sabina", "Nisha", "Asha", "Mina", "Rama", "Durga",
  "Priya", "Sneha", "Kriti", "Asmita", "Bipana", "Shristi", "Samjhana", "Dikshya"
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

// Wallet specific features for display
export const walletFeatures = [
  {
    icon: 'Smartphone',
    title: 'Smart Pull-Tab',
    titleNp: 'स्मार्ट पुल-ट्याब',
    description: 'तान्नुहोस् र Phone निस्कन्छ!'
  },
  {
    icon: 'CreditCard',
    title: '5 Card Slots',
    titleNp: '५ कार्ड स्लट',
    description: 'Cards सजिलै राख्नुहोस्'
  },
  {
    icon: 'IdCard',
    title: 'ID Window',
    titleNp: 'ID विन्डो',
    description: 'Photo/License देखाउनुहोस्'
  },
  {
    icon: 'Wallet',
    title: 'Cash Pocket',
    titleNp: 'पैसा पाकेट',
    description: 'Notes सुरक्षित राख्नुहोस्'
  },
  {
    icon: 'Lock',
    title: 'Snap Lock',
    titleNp: 'स्न्याप लक',
    description: 'Phone सुरक्षित!'
  },
  {
    icon: 'Grip',
    title: 'Wrist Strap',
    titleNp: 'हात डोरी',
    description: 'Grab & Go Easy!'
  }
];

