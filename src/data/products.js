export const PRODUCTS = [
  {
    id: 'laptop',
    name: 'Laptop',
    price: 650,
    category: 'Computers',
    variant: '14" Pro Ultrabook',
    color: 'Space Gray',
    spec: '16GB RAM • 512GB SSD',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description:
      'Lightweight aluminum laptop built for everyday productivity and smooth multitasking.',
  },
  {
    id: 'mouse',
    name: 'Mouse',
    price: 15,
    category: 'Accessories',
    variant: 'Wireless Optical',
    color: 'Matte Black',
    spec: '2.4GHz • Silent Click',
    image:
      'https://images.unsplash.com/photo-1613091253127-2cc8840f16f2?auto=format&fit=crop&w=800&q=80',
    description:
      'Ergonomic wireless mouse with precision tracking and long-lasting battery life.',
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    price: 25,
    category: 'Accessories',
    variant: 'Compact Mechanical',
    color: 'Graphite',
    spec: 'Tactile Switches • USB-C',
    image:
      'https://images.unsplash.com/photo-1743862558369-5dcea79ccbff?auto=format&fit=crop&w=800&q=80',
    description:
      'Clean low-profile keyboard with responsive tactile feedback for comfortable typing.',
  },
  {
    id: 'monitor',
    name: 'Monitor',
    price: 120,
    category: 'Displays',
    variant: '24" Full HD IPS',
    color: 'Midnight Silver',
    spec: '1080p • 75Hz • Slim Bezel',
    image:
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
    description:
      'Crisp 24-inch IPS display with wide viewing angles and an ultra-thin modern frame.',
  },
];

export const SHIPPING_METHODS = [
  {
    id: 'free',
    name: 'Free Shipping',
    description: 'Standard delivery • 7–20 business days',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Priority courier • 1–3 business days',
    price: 9,
  },
];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
