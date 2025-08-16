export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  images?: string[]
  category: string
  subcategory?: string
  rating: number
  reviewCount: number
  inStock: boolean
  stock?: number
  variants?: {
    size?: string[]
    color?: string[]
    material?: string[]
  }
  features?: string[]
  specifications?: Record<string, string>
  brand?: string
  warranty?: string
  tags?: string[]
  weight?: string
  dimensions?: string
  createdAt?: string
  updatedAt?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    image: "/product/Fjallraven -....png",
    images: [
      "/product/Fjallraven -....png",
      "/fjallraven-backpack.jpg"
    ],
    category: "men's clothing",
    rating: 3.9,
    reviewCount: 120,
    inStock: true,
    stock: 15,
    brand: "Fjallraven",
    features: [
      "Fits 15 inch laptops",
      "Water resistant",
      "Durable G-1000 HeavyDuty fabric",
      "Multiple compartments"
    ],
    specifications: {
      "Material": "G-1000 HeavyDuty",
      "Capacity": "16L",
      "Dimensions": "45x30x12 cm",
      "Weight": "0.55 kg"
    }
  },
  {
    id: "2",
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "/product/Mens Casual ....png",
    images: [
      "/product/Mens Casual ....png",
      "/mens-henley-shirt.jpg"
    ],
    category: "men's clothing",
    rating: 4.1,
    reviewCount: 259,
    inStock: true,
    stock: 32,
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["White", "Black", "Gray", "Navy"]
    },
    features: [
      "Slim fit design",
      "Premium cotton blend",
      "Three-button henley placket",
      "Contrast raglan sleeves"
    ]
  },
  {
    id: "3",
    name: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    image: "/product/Mens Cotton ....png",
    images: [
      "/product/Mens Cotton ....png",
      "/mens-casual-shirt.png"
    ],
    category: "men's clothing",
    rating: 4.7,
    reviewCount: 500,
    inStock: true,
    stock: 18,
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "Navy", "Brown", "Olive"]
    },
    features: [
      "Water resistant",
      "Wind proof",
      "Multiple pockets",
      "Adjustable hood"
    ],
    specifications: {
      "Material": "Cotton blend",
      "Season": "Spring/Autumn/Winter",
      "Care": "Machine washable"
    }
  },
  {
    id: "4",
    name: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    image: "/product/Men Casual ... $15.99.png",
    images: [
      "/product/Men Casual ... $15.99.png"
    ],
    category: "men's clothing",
    rating: 2.1,
    reviewCount: 430,
    inStock: true,
    stock: 25,
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "White", "Blue", "Gray"]
    },
    features: [
      "Slim fit design",
      "Premium cotton",
      "Casual wear",
      "Multiple colors"
    ]
  },
  {
    id: "5",
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    image: "/product/John Hardy W....png",
    images: [
      "/product/John Hardy W....png",
      "/gold-ring-jewelry.png"
    ],
    category: "jewelery",
    rating: 4.6,
    reviewCount: 400,
    inStock: true,
    stock: 8,
    brand: "John Hardy",
    features: [
      "Sterling silver and 18k gold",
      "Handcrafted design",
      "Dragon motif",
      "Adjustable length"
    ],
    specifications: {
      "Material": "Sterling Silver, 18K Gold",
      "Length": "Adjustable",
      "Collection": "Legends Naga",
      "Care": "Professional cleaning recommended"
    }
  },
  {
    id: "6",
    name: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    image: "/product/SOLID Gold P....png",
    images: [
      "/product/SOLID Gold P....png"
    ],
    category: "jewelery",
    rating: 3.9,
    reviewCount: 70,
    inStock: true,
    stock: 12,
    brand: "Hafeez Center",
    features: [
      "14K solid gold",
      "Micropave setting",
      "Petite design",
      "30-day return policy"
    ],
    specifications: {
      "Material": "14K Solid Gold",
      "Setting": "Micropave",
      "Return Policy": "30 days",
      "Origin": "United States"
    }
  },
  {
    id: "7",
    name: "White Gold Plated Princess",
    price: 9.99,
    originalPrice: 19.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    image: "/product/White Gold P....png",
    images: [
      "/product/White Gold P....png"
    ],
    category: "jewelery",
    rating: 3,
    reviewCount: 400,
    inStock: true,
    stock: 20,
    variants: {
      size: ["5", "6", "7", "8", "9", "10"]
    },
    features: [
      "White gold plated",
      "Princess cut design",
      "Created diamond",
      "Wedding/engagement suitable"
    ]
  },
  {
    id: "8",
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    image: "/product/Pierced Owl ....png",
    images: [
      "/product/Pierced Owl ....png"
    ],
    category: "jewelery",
    rating: 1.9,
    reviewCount: 100,
    inStock: true,
    stock: 15,
    brand: "Pierced Owl",
    variants: {
      size: ["14G", "12G", "10G", "8G", "6G"]
    },
    features: [
      "316L stainless steel",
      "Rose gold plated",
      "Double flared design",
      "Hypoallergenic"
    ]
  },
  {
    id: "9",
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Mac Compatibility requires reformatting",
    image: "/product/WD 2TB Eleme....png",
    images: [
      "/product/WD 2TB Eleme....png"
    ],
    category: "electronics",
    rating: 3.3,
    reviewCount: 203,
    inStock: true,
    stock: 30,
    brand: "Western Digital",
    features: [
      "USB 3.0 connectivity",
      "2TB storage capacity",
      "Portable design",
      "Plug and play"
    ],
    specifications: {
      "Capacity": "2TB",
      "Interface": "USB 3.0/2.0",
      "Compatibility": "Windows, Mac (requires reformatting)",
      "Dimensions": "4.22 x 3.15 x 0.85 inches"
    }
  },
  {
    id: "10",
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5 inch hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores)",
    image: "/product/SanDisk SSD ....png",
    images: [
      "/product/SanDisk SSD ....png"
    ],
    category: "electronics",
    rating: 2.9,
    reviewCount: 470,
    inStock: true,
    stock: 22,
    brand: "SanDisk",
    features: [
      "SATA III 6 Gb/s interface",
      "1TB storage capacity",
      "Faster boot and app loading",
      "Easy installation"
    ],
    specifications: {
      "Capacity": "1TB",
      "Interface": "SATA III 6 Gb/s",
      "Form Factor": "2.5 inch",
      "Read Speed": "Up to 535MB/s"
    }
  },
  {
    id: "11",
    name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost",
    price: 109,
    description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan",
    image: "/product/Silicon Powe....png",
    images: [
      "/product/Silicon Powe....png"
    ],
    category: "electronics",
    rating: 4.8,
    reviewCount: 319,
    inStock: true,
    stock: 18,
    brand: "Silicon Power",
    features: [
      "3D NAND flash technology",
      "SLC Cache performance boost",
      "256GB storage capacity",
      "High transfer speeds"
    ],
    specifications: {
      "Capacity": "256GB",
      "Interface": "SATA III",
      "Technology": "3D NAND",
      "Cache": "SLC Cache"
    }
  },
  {
    id: "12",
    name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    image: "/product/Wd 4 TB gamin.png",
    images: [
      "/product/Wd 4 TB gamin.png"
    ],
    category: "electronics",
    rating: 4.8,
    reviewCount: 400,
    inStock: true,
    stock: 12,
    brand: "Western Digital",
    features: [
      "PlayStation 4 compatible",
      "4TB storage capacity",
      "Portable design",
      "3-year warranty"
    ],
    specifications: {
      "Capacity": "4TB",
      "Compatibility": "PlayStation 4",
      "Interface": "USB 3.0",
      "Warranty": "3 years"
    }
  },
  {
    id: "13",
    name: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin",
    price: 599,
    description: "21.5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16:9. Color Supported - 16.7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree",
    image: "/curved-gaming-monitor.png",
    images: [
      "/curved-gaming-monitor.png"
    ],
    category: "electronics",
    rating: 2.9,
    reviewCount: 250,
    inStock: true,
    stock: 8,
    brand: "Acer",
    features: [
      "21.5 inch Full HD display",
      "IPS panel technology",
      "75Hz refresh rate",
      "Ultra-thin design"
    ],
    specifications: {
      "Screen Size": "21.5 inches",
      "Resolution": "1920 x 1080",
      "Panel Type": "IPS",
      "Refresh Rate": "75Hz",
      "Response Time": "4ms"
    }
  },
  {
    id: "14",
    name: "Samsung 49-Inch CHG90 QLED Gaming Monitor",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QLED delivers purer whites, deeper blacks and more lifelike colors Quantum HDR delivers HDR gaming with a peak brightness of 600 nits",
    image: "/product/Samsung 49-I....png",
    images: [
      "/product/Samsung 49-I....png",
      "/curved-gaming-monitor.png"
    ],
    category: "electronics",
    rating: 2.2,
    reviewCount: 140,
    inStock: false,
    stock: 0,
    brand: "Samsung",
    features: [
      "49 inch super ultrawide",
      "32:9 curved display",
      "QLED technology",
      "Quantum HDR"
    ],
    specifications: {
      "Screen Size": "49 inches",
      "Resolution": "3840 x 1080",
      "Panel Type": "QLED",
      "Refresh Rate": "144Hz",
      "Curvature": "1800R"
    }
  },
  {
    id: "15",
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure and handy.",
    image: "/product/BIYLACLESEN.png",
    images: [
      "/product/BIYLACLESEN.png"
    ],
    category: "women's clothing",
    rating: 2.6,
    reviewCount: 235,
    inStock: true,
    stock: 14,
    brand: "BIYLACLESEN",
    variants: {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Black", "Navy", "Red", "Purple"]
    },
    features: [
      "3-in-1 design",
      "Detachable liner",
      "Multiple pockets",
      "Warm fleece lining"
    ]
  },
  {
    id: "16",
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / DO NOT TUMBLE DRY / DO NOT IRON / DO NOT DRY CLEAN",
    image: "/product/Lock and Lov ....png",
    images: [
      "/product/Lock and Lov ....png"
    ],
    category: "women's clothing",
    rating: 2.9,
    reviewCount: 340,
    inStock: true,
    stock: 22,
    brand: "Lock and Love",
    variants: {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Black", "Brown", "Wine"]
    },
    features: [
      "Faux leather material",
      "Removable hood",
      "Moto biker style",
      "Front pockets"
    ]
  },
  {
    id: "17",
    name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    image: "/product/Rain Jacket ....png",
    images: [
      "/product/Rain Jacket ....png",
      "/womens-rain-jacket.png"
    ],
    category: "women's clothing",
    rating: 3.8,
    reviewCount: 679,
    inStock: true,
    stock: 28,
    variants: {
      size: ["S", "M", "L", "XL"],
      color: ["Navy Stripe", "Black Stripe", "Gray Stripe"]
    },
    features: [
      "Windbreaker design",
      "Adjustable drawstring",
      "Side pockets",
      "Hood with cotton lining"
    ]
  },
  {
    id: "18",
    name: "MBJ Women's Solid Short Sleeve Boat Neck V-Neck T-Shirt",
    price: 9.85,
    description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    image: "/product/MBJ Women's ....png",
    images: [
      "/product/MBJ Women's ....png"
    ],
    category: "women's clothing",
    rating: 4.7,
    reviewCount: 130,
    inStock: true,
    stock: 45,
    brand: "MBJ",
    variants: {
      size: ["XS", "S", "M", "L", "XL", "XXL"],
      color: ["White", "Black", "Navy", "Gray", "Pink", "Red"]
    },
    features: [
      "Cotton spandex blend",
      "V-neck design",
      "Short sleeves",
      "Soft and stretchy"
    ]
  },
  {
    id: "19",
    name: "Opna Women's Short Sleeve Moisture Wicking Athletic Golf Polo Shirt",
    price: 7.95,
    description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit. Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away from the body and cool and dry for all day comfort. Design details: activewear, front placket, golf shirt, moisture wicking, plain, polo shirt, short sleeve, soft, ultraviolet protection, upf, moisture-wicking, sportswear",
    image: "/product/Opna Women's ....png",
    images: [
      "/product/Opna Women's ....png"
    ],
    category: "women's clothing",
    rating: 4.5,
    reviewCount: 146,
    inStock: true,
    stock: 38,
    brand: "Opna",
    variants: {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["White", "Black", "Navy", "Pink", "Light Blue"]
    },
    features: [
      "Moisture wicking",
      "Athletic golf style",
      "UV protection",
      "Machine washable"
    ]
  },
  {
    id: "20",
    name: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    image: "/product/DANVOUY Wome....png",
    images: [
      "/product/DANVOUY Wome....png"
    ],
    category: "women's clothing",
    rating: 3.6,
    reviewCount: 145,
    inStock: true,
    stock: 33,
    brand: "DANVOUY",
    variants: {
      size: ["S", "M", "L", "XL"],
      color: ["White", "Black", "Gray", "Pink"]
    },
    features: [
      "Cotton spandex blend",
      "V-neck design",
      "Letter print",
      "Casual wear"
    ]
  }
]

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "men's clothing", name: "Men's Clothing", count: products.filter((p) => p.category === "men's clothing").length },
  { id: "women's clothing", name: "Women's Clothing", count: products.filter((p) => p.category === "women's clothing").length },
  { id: "jewelery", name: "Jewelry", count: products.filter((p) => p.category === "jewelery").length },
  { id: "electronics", name: "Electronics", count: products.filter((p) => p.category === "electronics").length },
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
