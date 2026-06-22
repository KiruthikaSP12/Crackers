import { hashPassword } from "../utils/security.js";

export let store = {
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin@crackershop.com",
      password: hashPassword("admin123"),
      role: "admin",
      phone: "+91 9876543210",
      addresses: ["Warehouse Road, Sivakasi"],
      orderHistory: [1001, 1002]
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@example.com",
      password: hashPassword("customer123"),
      role: "customer",
      phone: "+91 9123456789",
      addresses: ["Lake View Street, Madurai"],
      orderHistory: [1003]
    }
  ],
  categories: [
    { id: 1, name: "Festival Combos", slug: "festival-combos" },
    { id: 2, name: "Sparklers", slug: "sparklers" },
    { id: 3, name: "Sound Crackers", slug: "sound-crackers" },
    { id: 4, name: "Kids Specials", slug: "kids-specials" },
    { id: 5, name: "Ground Spinners", slug: "ground-spinners" },
    { id: 6, name: "Fountains & Flower Pots", slug: "fountains-flower-pots" },
    { id: 7, name: "Rockets & Aerial Shots", slug: "rockets-aerial-shots" },
    { id: 8, name: "Bombs & Garlands", slug: "bombs-garlands" }
  ],
  products: [
    {
      id: 101,
      name: "Diwali Mega Combo",
      categoryId: 1,
      type: "Combo",
      price: 1499,
      stock: 18,
      crackerCount: 45,
      popularity: 95,
      image:
        "https://images.unsplash.com/photo-1672670959598-1d32da1c6ec8?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=60&w=3000",
      description: "A festive family combo packed with sparklers, flower pots, and fountains.",
      rating: 4.8,
      reviews: 21
    },
    {
      id: 102,
      name: "Gold Sparklers Pack",
      categoryId: 2,
      type: "Sparklers",
      price: 249,
      stock: 80,
      crackerCount: 20,
      popularity: 88,
      image:
        "https://images.unsplash.com/photo-1542430816-c67e631261c4?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Long-lasting bright sparklers for safe family celebrations.",
      rating: 4.6,
      reviews: 15
    },
    {
      id: 103,
      name: "Thunder Bomb",
      categoryId: 3,
      type: "Sound",
      price: 399,
      stock: 32,
      crackerCount: 10,
      popularity: 73,
      image:
        "https://images.unsplash.com/photo-1672072961379-d0aee2e67eba?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "High-energy sound crackers for festive nights.",
      rating: 4.2,
      reviews: 11
    },
    {
      id: 104,
      name: "Kids Celebration Box",
      categoryId: 4,
      type: "Kids",
      price: 699,
      stock: 25,
      crackerCount: 25,
      popularity: 90,
      image:
        "https://images.unsplash.com/photo-1589167642085-b3e55c0178be?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "A gentle selection of low-noise crackers and bright fountains.",
      rating: 4.7,
      reviews: 18
    },
    {
      id: 105,
      name: "Classic Flower Pot",
      categoryId: 6,
      type: "Flower Pot",
      price: 180,
      stock: 90,
      crackerCount: 10,
      popularity: 86,
      image:
        "https://images.unsplash.com/photo-1761066644935-14551e47af49?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Traditional flower pot crackers with bright upward fountain sparks.",
      rating: 4.5,
      reviews: 17
    },
    {
      id: 106,
      name: "Deluxe Color Fountain",
      categoryId: 6,
      type: "Fountain",
      price: 320,
      stock: 60,
      crackerCount: 5,
      popularity: 89,
      image: "https://cdn.pixabay.com/photo/2021/02/14/07/35/flame-6013680_1280.jpg",
      description: "Tall colorful flower pot fountain for bright festive displays.",
      rating: 4.7,
      reviews: 22
    },
    {
      id: 107,
      name: "Silver Chakkar Pack",
      categoryId: 5,
      type: "Ground Spinner",
      price: 210,
      stock: 75,
      crackerCount: 10,
      popularity: 82,
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chakri_Fire_Cracker_Photo.JPG",
      description: "Fast-spinning ground chakkars with shimmering silver trails.",
      rating: 4.4,
      reviews: 13
    },
    {
      id: 108,
      name: "Rainbow Ground Spinner",
      categoryId: 5,
      type: "Ground Spinner",
      price: 260,
      stock: 54,
      crackerCount: 10,
      popularity: 85,
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chakri_Fire_Cracker_Photo.JPG",
      description: "Color-changing spinning crackers ideal for family celebrations.",
      rating: 4.6,
      reviews: 14
    },
    {
      id: 109,
      name: "Sky Rocket Pack",
      categoryId: 7,
      type: "Rocket",
      price: 450,
      stock: 46,
      crackerCount: 6,
      popularity: 87,
      image:
        "https://images.unsplash.com/photo-1750586658145-5b05347bc733?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "High-rise rockets with colorful burst effects and festival sparkle.",
      rating: 4.6,
      reviews: 20
    },
    {
      id: 110,
      name: "7 Shot Colour Battery",
      categoryId: 7,
      type: "7 Shots",
      price: 699,
      stock: 38,
      crackerCount: 7,
      popularity: 91,
      image:
        "https://images.unsplash.com/photo-1707158696193-c008bade2716?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "A compact seven-shot aerial cake with vivid sequential bursts.",
      rating: 4.8,
      reviews: 24
    },
    {
      id: 111,
      name: "Multishot Aerial Shell Box",
      categoryId: 7,
      type: "Aerial Shell",
      price: 1299,
      stock: 26,
      crackerCount: 12,
      popularity: 93,
      image:
        "https://images.unsplash.com/photo-1715784229627-e5cd49b1ed90?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Premium aerial shell and multishot assortment for grand night displays.",
      rating: 4.9,
      reviews: 28
    },
    {
      id: 112,
      name: "Festival Bomb Pack",
      categoryId: 8,
      type: "Bomb",
      price: 340,
      stock: 64,
      crackerCount: 10,
      popularity: 80,
      image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Fireworks_%286369772889%29.jpg",
      description: "Power-packed festival bombs for strong celebratory sound effects.",
      rating: 4.2,
      reviews: 10
    },
    {
      id: 113,
      name: "100 Wala Ladi",
      categoryId: 8,
      type: "Garland",
      price: 290,
      stock: 72,
      crackerCount: 100,
      popularity: 84,
      image:
        "https://images.unsplash.com/photo-1672518215332-a716859f9de8?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Traditional ladi garland crackers for loud and exciting festive moments.",
      rating: 4.3,
      reviews: 16
    },
    {
      id: 114,
      name: "1000 Wala Mega Ladi",
      categoryId: 8,
      type: "Garland",
      price: 1490,
      stock: 24,
      crackerCount: 1000,
      popularity: 88,
      image:
        "https://images.unsplash.com/photo-1672518215332-a716859f9de8?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Long-duration garland crackers for major festive events and celebrations.",
      rating: 4.5,
      reviews: 19
    },
    {
      id: 115,
      name: "Magic Poppers Pack",
      categoryId: 4,
      type: "Poppers",
      price: 120,
      stock: 110,
      crackerCount: 25,
      popularity: 78,
      image:
        "https://images.unsplash.com/photo-1645542351285-039fd9b03fca?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Kid-friendly poppers with tiny snaps and easy daytime fun.",
      rating: 4.5,
      reviews: 12
    },
    {
      id: 116,
      name: "Whistling Wheel Cracker",
      categoryId: 4,
      type: "Whistling",
      price: 230,
      stock: 68,
      crackerCount: 10,
      popularity: 81,
      image:
        "https://images.unsplash.com/photo-1677008401073-23b0270290a6?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Light, playful whistling crackers for fun family-friendly celebrations.",
      rating: 4.4,
      reviews: 11
    },
    {
      id: 117,
      name: "Green Sparklers Family Pack",
      categoryId: 2,
      type: "Sparklers",
      price: 299,
      stock: 84,
      crackerCount: 30,
      popularity: 79,
      image:
        "https://images.unsplash.com/photo-1542430816-c67e631261c4?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Family-size sparklers bundle with long burn time and bright finish.",
      rating: 4.6,
      reviews: 18
    }
  ],
  cart: [
    { productId: 101, quantity: 1 },
    { productId: 102, quantity: 2 }
  ],
  wishlist: [104],
  reviews: [
    { id: 1, productId: 101, user: "Priya", rating: 5, comment: "Perfect for our family night." },
    { id: 2, productId: 102, user: "Arun", rating: 4, comment: "Nice sparkles and steady burn." }
  ],
  notifications: [
    { id: 1, title: "Order confirmed", message: "Your combo pack order has been placed.", read: false },
    { id: 2, title: "Festival offer", message: "Get 10% off on combo boxes this week.", read: false }
  ],
  payments: [
    { id: 7001, orderId: 1003, method: "UPI", status: "Paid", amount: 1748 },
    { id: 7002, orderId: 1002, method: "COD", status: "Pending", amount: 699 }
  ],
  orders: [
    {
      id: 1001,
      userId: 1,
      status: "Delivered",
      items: [{ productId: 102, quantity: 3 }],
      total: 747,
      paymentMethod: "Card",
      paymentStatus: "Paid",
      placedOn: "2026-03-28"
    },
    {
      id: 1002,
      userId: 1,
      status: "Shipped",
      items: [{ productId: 104, quantity: 1 }],
      total: 699,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      placedOn: "2026-04-02"
    },
    {
      id: 1003,
      userId: 2,
      status: "Processing",
      items: [
        { productId: 101, quantity: 1 },
        { productId: 102, quantity: 1 }
      ],
      total: 1748,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      placedOn: "2026-04-05"
    }
  ]
};

export const getProductById = (id) => store.products.find((product) => product.id === Number(id));

export const enrichCart = () =>
  store.cart.map((item) => {
    const product = getProductById(item.productId);
    return {
      ...item,
      product,
      lineTotal: product.price * item.quantity
    };
  });

export const buildDashboard = () => {
  const totalSales = store.orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = store.products.filter((product) => product.stock <= 25);

  return {
    totalSales,
    totalOrders: store.orders.length,
    totalCustomers: store.users.filter((user) => user.role === "customer").length,
    lowStockProducts,
    recentOrders: store.orders.slice(-3).reverse(),
    customerInsights: {
      topCategory: "Festival Combos",
      repeatCustomers: 1,
      averageOrderValue: Math.round(totalSales / store.orders.length)
    }
  };
};
