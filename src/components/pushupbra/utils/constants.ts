// Push Up Bra Product Constants

// Available colors
export const productColors = ['Nude', 'Black', 'White', 'Pink'];

// Available sizes
export const productSizes = ['32B', '34B', '36B', '38B', '32C', '34C', '36C', '38C'];

// Color hex codes for UI
export const colorHexCodes: Record<string, string> = {
  'Nude': '#E8C4A0',
  'Black': '#1a1a1a',
  'White': '#FAFAFA',
  'Pink': '#F8B4C4',
};

// Product details per color
export const products: Record<string, {
  name: string;
  price: number;
  originalPrice: number;
  label?: string;
}> = {
  'Nude': {
    name: 'Seetara Push Up Bra - Nude',
    price: 999,
    originalPrice: 1499,
    label: 'Best Seller',
  },
  'Black': {
    name: 'Seetara Push Up Bra - Black',
    price: 999,
    originalPrice: 1499,
    label: 'Classic',
  },
  'White': {
    name: 'Seetara Push Up Bra - White',
    price: 999,
    originalPrice: 1499,
  },
  'Pink': {
    name: 'Seetara Push Up Bra - Pink',
    price: 999,
    originalPrice: 1499,
    label: 'Trending',
  },
};

// Product SKU for tracking
export const PRODUCT_SKU = 'Seetara Push Up Bra';

// Fake notification data for social proof
export const fakeNames = [
  'Sita', 'Gita', 'Rina', 'Sunita', 'Anita', 'Maya', 'Kamala', 
  'Sabina', 'Puja', 'Deepa', 'Binita', 'Mina', 'Sangita', 'Nisha',
  'Priya', 'Rekha', 'Sharmila', 'Kabita', 'Sarita', 'Laxmi'
];

export const fakeCities = [
  'Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar',
  'Birgunj', 'Butwal', 'Dharan', 'Nepalgunj', 'Hetauda',
  'Chitwan', 'Janakpur', 'Damak', 'Itahari', 'Bharatpur'
];

export const fakeTimes = [
  'भर्खरै', '2 min अघि', '5 min अघि', '8 min अघि', '12 min अघि',
  '15 min अघि', '20 min अघि', '25 min अघि', '30 min अघि'
];

// Product features for display
export const productFeatures = [
  { icon: '✨', title: 'Wire-Free Comfort', description: 'दिनभर आरामदायक' },
  { icon: '🌸', title: 'Breathable Fabric', description: 'सास फेर्न मिल्ने' },
  { icon: '💪', title: 'Perfect Lift', description: 'Natural shape' },
  { icon: '🎀', title: 'Seamless Design', description: 'T-shirt मुनि नदेखिने' },
];

// Trust badges
export const trustBadges = [
  { icon: '📦', text: 'Discrete Packaging' },
  { icon: '🔒', text: 'Privacy Protected' },
  { icon: '💯', text: 'Quality Guaranteed' },
  { icon: '🚚', text: 'Free Delivery' },
];
