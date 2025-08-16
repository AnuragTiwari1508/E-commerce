// Test Data for Product Cards Demo
export const testProducts = [
  {
    id: 'test-1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality noise-canceling wireless headphones with premium sound quality and long battery life.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    rating: { rate: 4.5, count: 324 },
    inStock: true,
    variants: [
      { id: 'color-black', name: 'Matte Black', priceModifier: 0 },
      { id: 'color-white', name: 'Pearl White', priceModifier: 15 },
      { id: 'color-blue', name: 'Ocean Blue', priceModifier: 25 }
    ]
  },
  {
    id: 'test-2',
    title: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking capabilities.',
    price: 149.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    rating: { rate: 4.2, count: 156 },
    inStock: true,
    variants: [
      { id: 'size-s', name: 'Small (38mm)', priceModifier: 0 },
      { id: 'size-m', name: 'Medium (42mm)', priceModifier: 20 },
      { id: 'size-l', name: 'Large (46mm)', priceModifier: 30 }
    ]
  },
  {
    id: 'test-3',
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt perfect for everyday wear.',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341338985-b50037b04346?w=500&h=500&fit=crop'
    ],
    category: 'men\'s clothing',
    rating: { rate: 4.8, count: 89 },
    inStock: true,
    variants: [
      { id: 'size-xs', name: 'Extra Small', priceModifier: 0 },
      { id: 'size-s', name: 'Small', priceModifier: 0 },
      { id: 'size-m', name: 'Medium', priceModifier: 0 },
      { id: 'size-l', name: 'Large', priceModifier: 5 },
      { id: 'size-xl', name: 'Extra Large', priceModifier: 5 }
    ]
  },
  {
    id: 'test-4',
    title: 'Artisan Coffee Mug Set',
    description: 'Handcrafted ceramic coffee mug set, perfect for coffee enthusiasts.',
    price: 45.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop'
    ],
    category: 'home & kitchen',
    rating: { rate: 4.6, count: 78 },
    inStock: false,
    variants: [
      { id: 'color-white', name: 'Classic White', priceModifier: 0 },
      { id: 'color-blue', name: 'Ocean Blue', priceModifier: 8 },
      { id: 'color-green', name: 'Forest Green', priceModifier: 8 }
    ]
  },
  {
    id: 'test-5',
    title: 'Minimalist Laptop Bag',
    description: 'Sleek and functional laptop bag designed for modern professionals.',
    price: 89.99,
    originalPrice: 120.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'
    ],
    category: 'bags & accessories',
    rating: { rate: 4.4, count: 203 },
    inStock: true,
    variants: [
      { id: 'size-13', name: '13" Laptop', priceModifier: 0 },
      { id: 'size-15', name: '15" Laptop', priceModifier: 10 },
      { id: 'size-17', name: '17" Laptop', priceModifier: 20 }
    ]
  },
  {
    id: 'test-6',
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 34.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    rating: { rate: 4.1, count: 145 },
    inStock: true,
    variants: [
      { id: 'color-black', name: 'Midnight Black', priceModifier: 0 },
      { id: 'color-white', name: 'Snow White', priceModifier: 0 }
    ]
  }
];

// Sample product data structure for testing
export const sampleProductData = {
  // Product Information
  id: 'unique-product-id',
  title: 'Product Name',
  description: 'Detailed product description...',
  price: 99.99,
  originalPrice: 129.99, // Optional - for showing discounts
  
  // Images
  image: 'primary-image-url.jpg', // Primary image for backwards compatibility
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], // Array for carousel
  
  // Category & Rating
  category: 'electronics',
  rating: {
    rate: 4.5,
    count: 128
  },
  
  // Stock Status
  inStock: true,
  
  // Variants (sizes, colors, etc.)
  variants: [
    { 
      id: 'variant-1', 
      name: 'Small', 
      priceModifier: 0 // Additional cost for this variant
    },
    { 
      id: 'variant-2', 
      name: 'Medium', 
      priceModifier: 10 
    },
    { 
      id: 'variant-3', 
      name: 'Large', 
      priceModifier: 20 
    }
  ]
};

export default testProducts;
