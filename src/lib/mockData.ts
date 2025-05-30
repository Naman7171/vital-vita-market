import { Product, Review, User } from "./types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Whey Protein",
    description: "Premium grass-fed whey protein with natural flavor. No artificial ingredients or sweeteners. 24g protein per serving.",
    price: 49.99,
    discountPercentage: 10,
    rating: 4.8,
    stock: 50,
    category: "Supplements",
    tags: ["protein", "organic", "fitness"],
    images: [
      "https://images.unsplash.com/photo-1622818425825-1c89e9a4133c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1594302954323-575daefd3c9e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: true,
    bestSeller: true,
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Vitamin D3 + K2 Drops",
    description: "Superior bone and immune health support with 1000 IU of D3 and 100mcg of K2 per serving.",
    price: 29.99,
    rating: 4.7,
    stock: 100,
    category: "Vitamins",
    tags: ["vitamin D", "immune", "bone health"],
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: true,
    bestSeller: false,
    createdAt: "2023-02-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Omega-3 Fish Oil",
    description: "Ultra-pure, molecularly distilled fish oil with 1000mg Omega-3s per serving. Supports heart, brain, and joint health.",
    price: 34.99,
    rating: 4.5,
    stock: 75,
    category: "Supplements",
    tags: ["omega-3", "heart health", "brain health"],
    images: [
      "https://images.unsplash.com/photo-1577563672807-0070a7a1b53e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586014758171-c41d56ef6cf5?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: false,
    bestSeller: true,
    createdAt: "2023-03-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Organic Green Superfood Powder",
    description: "Nutrient-dense blend of 40+ organic greens, fruits, and vegetables. Boosts energy and supports detoxification.",
    price: 59.99,
    discountPercentage: 15,
    rating: 4.6,
    stock: 30,
    category: "Superfoods",
    tags: ["greens", "detox", "energy"],
    images: [
      "https://images.unsplash.com/photo-1598733466878-41c586086e5f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1504858700536-882c978a3464?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: true,
    bestSeller: true,
    createdAt: "2023-04-20T00:00:00Z",
  },
  {
    id: "5",
    name: "Probiotic 50 Billion CFU",
    description: "Clinical-strength probiotic with 10 strains for digestive health and immune support. Shelf-stable and allergen-free.",
    price: 39.99,
    rating: 4.9,
    stock: 60,
    category: "Digestive Health",
    tags: ["probiotics", "gut health", "immune support"],
    images: [
      "https://images.unsplash.com/photo-1587854680352-936b22b91030?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1582711012124-a56cf82307a0?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: false,
    bestSeller: false,
    createdAt: "2023-05-12T00:00:00Z",
  },
  {
    id: "6",
    name: "Magnesium Glycinate",
    description: "Highly bioavailable form of magnesium that supports muscle relaxation, sleep quality, and stress management.",
    price: 24.99,
    rating: 4.7,
    stock: 90,
    category: "Minerals",
    tags: ["magnesium", "sleep", "stress"],
    images: [
      "https://images.unsplash.com/photo-1616506329866-95eae3ca1b1e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1625330549373-6cc803daf254?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: false,
    bestSeller: true,
    createdAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "7",
    name: "Plant-Based Protein Bars",
    description: "Delicious protein bars with 15g of clean plant protein. Perfect for on-the-go nutrition. Gluten-free and vegan.",
    price: 29.99,
    discountPercentage: 5,
    rating: 4.4,
    stock: 120,
    category: "Snacks",
    tags: ["protein", "vegan", "snack"],
    images: [
      "https://images.unsplash.com/photo-1569926656779-77d4f9ade1f8?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1654638263368-86e3a1a4ce16?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: true,
    bestSeller: false,
    createdAt: "2023-07-08T00:00:00Z",
  },
  {
    id: "8",
    name: "Collagen Peptides",
    description: "Grass-fed collagen to support healthy skin, hair, nails, and joints. Unflavored and mixes easily with any liquid.",
    price: 44.99,
    rating: 4.8,
    stock: 45,
    category: "Beauty & Wellness",
    tags: ["collagen", "skin health", "joint health"],
    images: [
      "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    featured: true,
    bestSeller: true,
    createdAt: "2023-08-15T00:00:00Z",
  },
];

export const mockReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "user1",
    userName: "Sarah J.",
    rating: 5,
    comment: "Amazing protein powder! It mixes so well and tastes great without any artificial sweeteners. Will definitely purchase again.",
    createdAt: "2023-03-10T00:00:00Z",
  },
  {
    id: "2",
    productId: "1",
    userId: "user2",
    userName: "Michael T.",
    rating: 4,
    comment: "Good quality protein, but I wish it had a bit more flavor. Still, love that it's all organic!",
    createdAt: "2023-04-15T00:00:00Z",
  },
  {
    id: "3",
    productId: "2",
    userId: "user3",
    userName: "Emma K.",
    rating: 5,
    comment: "These vitamin drops are so easy to use! I've noticed a huge difference in my energy levels since I started taking them.",
    createdAt: "2023-05-20T00:00:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "user2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    createdAt: "2023-01-02T00:00:00Z",
  },
];

export const mockCategories = [
  "Supplements",
  "Vitamins",
  "Minerals",
  "Superfoods",
  "Digestive Health",
  "Beauty & Wellness",
  "Snacks",
  "Sports Nutrition",
];
