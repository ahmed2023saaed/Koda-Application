
import { Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProductsPage = lazy(() =>
  import("../pages/ProductsPage")
);

const ProductLayout = lazy(() =>
  import("../components/ProductLayout")
);
const AddProductPage = lazy(() =>
  import("../pages/AddProductPage")
);
const EditProductPage = lazy(() =>
  import("../pages/EditProductPage")
);
const ViewProductPage = lazy(() =>
  import("../pages/ViewProductPage")
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

        <Route path="/products" element={<ProductLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path="add" element={<AddProductPage />} />
          <Route path="edit/:id" element={<EditProductPage />} />
          <Route path="view/:id" element={<ViewProductPage />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
