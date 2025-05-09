import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Fit Oxford Shirt",
    price: 59.99,
    images: ["/Images/image1.avif", "/Images/image2.avif"],
    category: "men",
    subCategory: "shirts",
    description:
      "A timeless classic fit oxford shirt perfect for any occasion. Made with 100% premium cotton for breathable comfort and long-lasting wear.",
    features: [
      "100% Premium Cotton",
      "Button-down collar",
      "Machine washable",
      "Regular fit",
    ],
    colors: ["White", "Blue", "Light Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    gender: "men",
  },
  {
    id: "p2",
    name: "Tailored Slim Fit Suit",
    price: 299.99,
    originalPrice: 399.99,
    images: ["/Images/image3.avif", "/Images/image4.avif"],
    category: "men",
    subCategory: "suits",
    description:
      "Modern tailored slim fit suit crafted from premium Italian wool. Perfect for business and formal occasions with its sleek silhouette and expert craftsmanship.",
    features: [
      "Premium Italian wool",
      "Slim fit design",
      "Fully lined",
      "Interior pockets",
      "Dry clean only",
    ],
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["44R", "46R", "48R", "50R", "52R"],
    inStock: true,
    rating: 4.9,
    reviews: 86,
    isSale: true,
    gender: "men",
  },
  {
    id: "p3",
    name: "Women's Cashmere Sweater",
    price: 149.99,
    images: ["/Images/image5.avif", "/Images/image6.avif"],
    category: "women",
    subCategory: "sweaters",
    description:
      "Luxurious 100% cashmere sweater with a relaxed fit and ribbed details. Incredibly soft and warm, this sweater is perfect for cold weather layering.",
    features: [
      "100% pure cashmere",
      "Relaxed fit",
      "Ribbed cuffs and hem",
      "Dry clean recommended",
    ],
    colors: ["Cream", "Black", "Burgundy", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    rating: 4.7,
    reviews: 203,
    gender: "women",
  },
  {
    id: "p4",
    name: "Floral Print Summer Dress",
    price: 79.99,
    images: ["/Images/image7.avif", "/Images/image8.avif"],
    category: "women",
    subCategory: "dresses",
    description:
      "Breezy summer dress in a beautiful floral print, featuring a flattering A-line silhouette and comfortable cotton blend fabric.",
    features: [
      "Cotton-blend fabric",
      "A-line silhouette",
      "Side pockets",
      "Machine washable",
    ],
    colors: ["Blue Floral", "Red Floral", "Yellow Floral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    rating: 4.5,
    reviews: 178,
    isNew: true,
    gender: "women",
  },
  {
    id: "p5",
    name: "Kids Dinosaur Print T-shirt",
    price: 24.99,
    images: ["/Images/image9.avif", "/Images/image10.avif"],
    category: "children",
    subCategory: "t-shirts",
    description:
      "Fun and colorful dinosaur print t-shirt for kids. Made from soft 100% organic cotton that's kind to sensitive skin.",
    features: [
      "100% organic cotton",
      "Crew neck",
      "Machine washable",
      "Dinosaur print design",
    ],
    colors: ["Blue", "Green", "Red"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    inStock: true,
    rating: 4.8,
    reviews: 92,
    gender: "children",
  },
  {
    id: "p6",
    name: "Performance Running Shoes",
    price: 129.99,
    images: ["/Images/image11.avif", "/Images/image12.avif"],
    category: "sports",
    subCategory: "footwear",
    description:
      "High-performance running shoes designed for serious runners. Features responsive cushioning, breathable mesh upper, and durable rubber outsole.",
    features: [
      "Breathable mesh upper",
      "Responsive cushioning",
      "Durable rubber outsole",
      "Reflective details",
    ],
    colors: ["Black/Red", "Grey/Blue", "White/Green"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    rating: 4.9,
    reviews: 256,
    gender: "unisex",
  },
  {
    id: "p7",
    name: "Executive Leather Briefcase",
    price: 199.99,
    originalPrice: 249.99,
    images: ["/Images/image13.avif", "/Images/image14.avif"],
    category: "corporate",
    subCategory: "accessories",
    description:
      "Professional leather briefcase perfect for the modern executive. Features multiple compartments for organization, padded laptop sleeve, and premium hardware.",
    features: [
      "Genuine leather",
      "Padded laptop compartment",
      "Multiple organization pockets",
      "Premium metal hardware",
      "Adjustable shoulder strap",
    ],
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    inStock: true,
    rating: 4.7,
    reviews: 68,
    isSale: true,
    gender: "unisex",
  },
  {
    id: "p8",
    name: "Weekend Casual Combo",
    price: 149.99,
    originalPrice: 199.99,
    images: ["/Images/image15.avif", "/Images/image16.avif"],
    category: "combos",
    subCategory: "casual",
    description:
      "Perfect weekend casual combo including a premium t-shirt, chino shorts, and canvas sneakers. Save when you buy the set!",
    features: [
      "Premium cotton t-shirt",
      "Comfortable chino shorts",
      "Canvas sneakers",
      "Coordinated colors",
    ],
    colors: ["Navy", "Beige", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.6,
    reviews: 42,
    isSale: true,
    gender: "men",
  },
  {
    id: "p9",
    name: "Organic Cotton Baby Onesie Set",
    price: 39.99,
    images: ["/Images/image17.avif", "/Images/image18.avif"],
    category: "children",
    subCategory: "baby",
    description:
      "Set of 3 adorable organic cotton onesies for babies. Super soft, gentle on sensitive skin, and available in cute designs.",
    features: [
      "100% organic cotton",
      "Snap closures",
      "Machine washable",
      "Set of 3 designs",
    ],
    colors: ["Pastel Mix", "Animal Print", "Stripes"],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    inStock: true,
    rating: 4.9,
    reviews: 127,
    isNew: true,
    gender: "children",
  },
  {
    id: "p10",
    name: "Women's Workout Set",
    price: 89.99,
    images: ["/Images/image19.avif", "/Images/image20.avif"],
    category: "sports",
    subCategory: "activewear",
    description:
      "High-performance women's workout set including leggings and sports bra. Featuring moisture-wicking fabric, four-way stretch, and stylish design.",
    features: [
      "Moisture-wicking fabric",
      "Four-way stretch",
      "Squat-proof",
      "Hidden pocket in waistband",
    ],
    colors: ["Black", "Navy", "Mauve", "Teal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    rating: 4.7,
    reviews: 215,
    gender: "women",
  },
  {
    id: "p11",
    name: "Men's Slim Jeans",
    price: 69.99,
    images: ["/Images/image21.avif", "/Images/image22.avif"],
    category: "men",
    subCategory: "pants",
    description:
      "Modern slim fit jeans with slight stretch for comfort. Made with premium denim that holds its shape wear after wear.",
    features: [
      "Premium stretch denim",
      "Slim fit",
      "Five-pocket styling",
      "Machine washable",
    ],
    colors: ["Dark Blue", "Medium Wash", "Black"],
    sizes: ["28x30", "30x30", "32x30", "34x30", "36x30", "38x30"],
    inStock: true,
    rating: 4.6,
    reviews: 182,
    gender: "men",
  },
  {
    id: "p12",
    name: "Formal Business Combo",
    price: 279.99,
    originalPrice: 349.99,
    images: ["/Images/image23.avif", "/Images/image24.avif"],
    category: "combos",
    subCategory: "formal",
    description:
      "Complete business formal combo including a premium dress shirt, silk tie, and leather belt. Perfect for the office or formal events.",
    features: [
      "Premium cotton dress shirt",
      "100% silk tie",
      "Genuine leather belt",
      "Coordinated colors and patterns",
    ],
    colors: ["Navy/Blue", "White/Red", "Light Blue/Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    rating: 4.8,
    reviews: 56,
    isSale: true,
    gender: "men",
  },
];

// Get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

// Get products by subcategory
export const getProductsBySubCategory = (subCategory: string) => {
  return products.filter(
    (product) => product.subCategory.toLowerCase() === subCategory.toLowerCase()
  );
};

// Get product by id
export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

// Get similar products
export const getSimilarProducts = (product: Product, limit = 4) => {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.subCategory === product.subCategory)
    )
    .slice(0, limit);
};

// Get featured products
export const getFeaturedProducts = (limit = 8) => {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, limit);
};

// Get new arrivals
export const getNewArrivals = (limit = 8) => {
  return products.filter((product) => product.isNew).slice(0, limit);
};

// Get sale products
export const getSaleProducts = (limit = 8) => {
  return products.filter((product) => product.isSale).slice(0, limit);
};

// Search products
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subCategory.toLowerCase().includes(searchTerm)
  );
};
