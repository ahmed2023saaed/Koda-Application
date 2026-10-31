import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  UsersPage,
  ProductsPage,
  AddProductPage,
  OrdersPage,
  CartsPage,
  SettingsPage,
} from "./lazyPages";

import { ProtectedRoute, GuestRoute } from "./protectedRoute";

// ─── Page-level Suspense fallback (per-route label) ────────────────────────
const pageFallback = (label) => <LoadingScreen label={label} withSkeletons />;

// ─── Router definition ──────────────────────────────────────────────────────
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },

  // Auth (guest-only)
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: (
              <Suspense fallback={pageFallback("Loading login...")}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: "/register",
            element: (
              <Suspense fallback={pageFallback("Loading register...")}>
                <RegisterPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Admin (protected)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={pageFallback("Loading admin overview...")}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: "/users",
            element: (
              <Suspense fallback={pageFallback("Loading users...")}>
                <UsersPage />
              </Suspense>
            ),
          },
          {
            path: "/products",
            element: (
              <Suspense fallback={pageFallback("Loading products...")}>
                <ProductsPage />
              </Suspense>
            ),
          },
          {
            path: "/products/new",
            element: (
              <Suspense fallback={pageFallback("Loading product form...")}>
                <AddProductPage />
              </Suspense>
            ),
          },
          {
            path: "/orders",
            element: (
              <Suspense fallback={pageFallback("Loading orders...")}>
                <OrdersPage />
              </Suspense>
            ),
          },
          {
            path: "/carts",
            element: (
              <Suspense fallback={pageFallback("Loading carts...")}>
                <CartsPage />
              </Suspense>
            ),
          },
          {
            path: "/settings",
            element: (
              <Suspense fallback={pageFallback("Loading settings...")}>
                <SettingsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Fallback
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;