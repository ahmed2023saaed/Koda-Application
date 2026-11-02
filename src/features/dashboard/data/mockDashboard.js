export const mockDashboard = {
  totals: {
    totalOrders: 367,
    pendingOrders: 11,
    revenue: 385668.73,
    thisMonth: 601.56,
    usersCount: 2,
    topProduct: { name: "Modern Floor Lamp", sold: 51 },
  },
  orderStatus: {
    pending: 11,
    processing: 24,
    confirmed: 25,
    shipped: 45,
    delivered: 108,
    cancelled: 144,
  },
  topProducts: [
    { id: 1, name: "Modern Floor Lamp", sold: 51, revenue: 4029, image: "" },
    { id: 2, name: "Air Fryer XL", sold: 34, revenue: 4726, image: "" },
    { id: 3, name: "Nike Men's Air Max Torch Shoes", sold: 31, revenue: 310, image: "" },
    { id: 4, name: "Logitech MX Master 3S Wireless Mouse", sold: 30, revenue: 2580, image: "" },
    { id: 5, name: "iPhone 17 Pro Max Orange", sold: 25, revenue: 1500, image: "" },
  ],
  recentOrders: [
    { id: 1, customer: "Customer", product: "Facilis nihil qui in", date: "Oct 27, 2026", status: "confirmed", total: 340.7 },
    { id: 2, customer: "Customer", product: "GoPro HERO12 Black Action Camera", date: "Oct 20, 2026", status: "returned", total: 5639.57 },
    { id: 3, customer: "Customer", product: "new Charge", date: "Oct 18, 2026", status: "confirmed", total: 52.8 },
    { id: 4, customer: "Customer", product: "Anker Prime 200W Power Bank (20,000mAh) - Nexis Edition", date: "Oct 4, 2026", status: "delivered", total: 300.78 },
    { id: 5, customer: "Customer", product: "Anker Prime 200W Power Bank (20,000mAh) - Nexis Edition", date: "Oct 4, 2026", status: "delivered", total: 300.78 },
  ],
};

export const formatMoney = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);