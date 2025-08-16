export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  category: string
  subcategory?: string
  rating: number
  reviewCount: number
  inStock: boolean
  variants?: {
    size?: string[]
    color?: string[]
    material?: string[]
  }
  features?: string[]
  specifications?: Record<string, string>
}

export const products: Product[] = [
  {
    id: "1",
    name: "Men's Casual Premium Shirt",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. Please note that due to limitations of photography and the inevitable differences in monitor settings.",
    image: "/mens-casual-shirt.png",
    category: "Fashion",
    subcategory: "Men's Clothing",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Blue", "White", "Black", "Gray"],
    },
  },
  {
    id: "2",
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    image: "/placeholder-unka4.png",
    category: "Jewelry",
    subcategory: "Bracelets",
    rating: 5.0,
    reviewCount: 89,
    inStock: true,
    features: ["Handcrafted", "Sterling Silver", "18K Gold Plating", "Adjustable"],
  },
  {
    id: "3",
    name: "Solid Gold Petite Micropave",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    image: "/gold-ring-jewelry.png",
    category: "Jewelry",
    subcategory: "Rings",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    variants: {
      size: ["5", "6", "7", "8", "9", "10"],
    },
  },
  {
    id: "4",
    name: "White Gold Plated Princess Cut Engagement Ring",
    price: 9.99,
    originalPrice: 19.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day.",
    image: "/gold-ring-jewelry.png",
    category: "Jewelry",
    subcategory: "Rings",
    rating: 4.2,
    reviewCount: 203,
    inStock: true,
    variants: {
      size: ["5", "6", "7", "8", "9", "10"],
    },
  },
  {
    id: "5",
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double Flared Tunnel Plug Earrings",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel. Hypoallergenic and comfortable for daily wear.",
    image: "/placeholder-unka4.png",
    category: "Jewelry",
    subcategory: "Earrings",
    rating: 4.3,
    reviewCount: 67,
    inStock: true,
    variants: {
      size: ["14G", "12G", "10G", "8G", "6G"],
    },
  },
  {
    id: "6",
    name: "WD 2TB Elements Portable External Hard Drive",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7.",
    image: "/placeholder-pm6ax.png",
    category: "Electronics",
    subcategory: "Storage",
    rating: 4.3,
    reviewCount: 1247,
    inStock: true,
    specifications: {
      Capacity: "2TB",
      Interface: "USB 3.0",
      Compatibility: "Windows, Mac",
      Dimensions: "4.22 x 3.15 x 0.85 inches",
    },
  },
  {
    id: "7",
    name: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109,
    description:
      'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5" hard drive; Based on published specifications and internal benchmarking tests).',
    image: "/placeholder-pm6ax.png",
    category: "Electronics",
    subcategory: "Storage",
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    specifications: {
      Capacity: "1TB",
      Interface: "SATA III",
      "Form Factor": "2.5 inch",
      "Read Speed": "Up to 535MB/s",
    },
  },
  {
    id: "8",
    name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance.",
    image: "/placeholder-pm6ax.png",
    category: "Electronics",
    subcategory: "Storage",
    rating: 4.4,
    reviewCount: 445,
    inStock: true,
    specifications: {
      Capacity: "256GB",
      Interface: "SATA III",
      Technology: "3D NAND",
      Cache: "SLC Cache",
    },
  },
  {
    id: "9",
    name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty.",
    image: "/placeholder-pm6ax.png",
    category: "Electronics",
    subcategory: "Gaming",
    rating: 4.7,
    reviewCount: 678,
    inStock: true,
    specifications: {
      Capacity: "4TB",
      Compatibility: "PlayStation 4",
      Interface: "USB 3.0",
      Warranty: "3 years",
    },
  },
  {
    id: "10",
    name: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin Monitor",
    price: 599,
    description:
      "21.5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port.",
    image: "/curved-gaming-monitor.png",
    category: "Electronics",
    subcategory: "Monitors",
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    specifications: {
      "Screen Size": "21.5 inches",
      Resolution: "1920 x 1080",
      "Panel Type": "IPS",
      "Refresh Rate": "75Hz",
    },
  },
  {
    id: "11",
    name: "Samsung 49-Inch CHG90 QLED Gaming Monitor",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QLED delivers purer whites, deeper blacks and more lifelike colors.",
    image: "/curved-gaming-monitor.png",
    category: "Electronics",
    subcategory: "Monitors",
    rating: 4.7,
    reviewCount: 156,
    inStock: false,
    specifications: {
      "Screen Size": "49 inches",
      Resolution: "3840 x 1080",
      "Panel Type": "QLED",
      "Refresh Rate": "144Hz",
      Curvature: "1800R",
    },
  },
  {
    id: "12",
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note: The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece.",
    image: "/womens-rain-jacket.png",
    category: "Fashion",
    subcategory: "Women's Clothing",
    rating: 4.1,
    reviewCount: 89,
    inStock: true,
    variants: {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Black", "Navy", "Red", "Purple"],
    },
  },
  {
    id: "13",
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front.",
    image: "/womens-rain-jacket.png",
    category: "Fashion",
    subcategory: "Women's Clothing",
    rating: 4.4,
    reviewCount: 167,
    inStock: true,
    variants: {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Black", "Brown", "Wine"],
    },
  },
  {
    id: "14",
    name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfect for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat.",
    image: "/womens-rain-jacket.png",
    category: "Fashion",
    subcategory: "Women's Clothing",
    rating: 4.2,
    reviewCount: 203,
    inStock: true,
    variants: {
      size: ["S", "M", "L", "XL"],
      color: ["Navy Stripe", "Black Stripe", "Gray Stripe"],
    },
  },
  {
    id: "15",
    name: "MBJ Women's Solid Short Sleeve Boat Neck V-Neck T-Shirt",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort.",
    image: "/womens-rain-jacket.png",
    category: "Fashion",
    subcategory: "Women's Clothing",
    rating: 4.0,
    reviewCount: 445,
    inStock: true,
    variants: {
      size: ["XS", "S", "M", "L", "XL", "XXL"],
      color: ["White", "Black", "Navy", "Gray", "Pink", "Red"],
    },
  },
  {
    id: "16",
    name: "Opna Women's Short Sleeve Moisture Wicking Athletic Golf Polo Shirt",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit.",
    image: "/womens-rain-jacket.png",
    category: "Fashion",
    subcategory: "Women's Clothing",
    rating: 3.9,
    reviewCount: 234,
    inStock: true,
    variants: {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["White", "Black", "Navy", "Pink", "Light Blue"],
    },
  },
  {
    id: "17",
    name: "DANVOUY Women's T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch.",
    image: "/womens-rain-jacket.png",
    category: "Fashion",
    subcategory: "Women's Clothing",
    rating: 4.1,
    reviewCount: 178,
    inStock: true,
    variants: {
      size: ["S", "M", "L", "XL"],
      color: ["White", "Black", "Gray", "Pink"],
    },
  },
]

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "fashion", name: "Fashion", count: products.filter((p) => p.category === "Fashion").length },
  { id: "electronics", name: "Electronics", count: products.filter((p) => p.category === "Electronics").length },
  { id: "jewelry", name: "Jewelry", count: products.filter((p) => p.category === "Jewelry").length },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function filterProductsByPrice(products: Product[], minPrice: number, maxPrice: number): Product[] {
  return products.filter((product) => product.price >= minPrice && product.price <= maxPrice)
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}
