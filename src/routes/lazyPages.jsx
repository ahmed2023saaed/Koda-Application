import React from "react";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────
export const LoginPage = React.lazy(() =>
  import("@/features/auth/pages/LoginPage").then((m) => ({ default: m.default })),
);
export const RegisterPage = React.lazy(() =>
  import("@/features/auth/pages/RegisterPage").then((m) => ({ default: m.default })),
);
export const DashboardPage = React.lazy(() =>
  import("@/features/dashboard/pages/DashboardPage").then((m) => ({ default: m.default })),
);
export const UsersPage = React.lazy(() =>
  import("@/features/users/pages/UsersPage").then((m) => ({ default: m.default })),
);
export const ProductsPage = React.lazy(() =>
  import("@/features/products/pages/ProductsPage").then((m) => ({ default: m.default })),
);
export const AddProductPage = React.lazy(() =>
  import("@/features/products/pages/AddProductPage").then((m) => ({ default: m.default })),
);
export const OrdersPage = React.lazy(() =>
  import("@/features/orders/pages/OrdersPage").then((m) => ({ default: m.default })),
);
export const CartsPage = React.lazy(() =>
  import("@/features/carts/pages/CartsPage").then((m) => ({ default: m.default })),
);
export const SettingsPage = React.lazy(() =>
  import("@/features/settings/pages/SettingsPage").then((m) => ({ default: m.default })),
);