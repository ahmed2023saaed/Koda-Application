import { Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
const ProductsPage = lazy(() =>
  import("../pages/ProductsPage")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
              <Link to="/products">Go to Products</Link>
            </div>
          }
        />

        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Suspense>
  );
}