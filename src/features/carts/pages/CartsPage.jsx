import { useEffect, useState } from "react";
import api from "../../../Api/axios";
import CartCard from "../components/CartCard";
import { mockCart } from "../mockCarts";


const USE_MOCK = false;

function CartsPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      setLoading(true);
      setError("");
      try {
        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 600));
          if (!cancelled) setCart(mockCart);
        } else {
          const res = await api.get("/carts");
          const data = res.data?.cart ?? res.data?.data ?? res.data;
          if (!cancelled) setCart(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message ?? "Failed to load cart.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCart();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Carts</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Cart overview</h1>
        <p className="mt-2 text-sm text-slate-300">
          All active carts returned from the API are rendered here with their
          latest item details.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-slate-300">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          Loading cart...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
          <p>{error}</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && isEmpty && (
        <div className="max-w-md rounded-3xl border border-dashed border-slate-700 p-6 text-slate-300">
          No carts returned from the API.
        </div>
      )}

      {!loading && !error && !isEmpty && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CartCard cart={cart} />
        </div>
      )}
    </section>
  );
}

export default CartsPage;