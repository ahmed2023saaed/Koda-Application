import { formatMoney } from "../data/mockDashboard";

function TopProducts({ products }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">Top Products</p>
      <h2 className="text-xl font-semibold text-slate-50">Best sellers</h2>

      <div className="mt-4 flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3.5 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-slate-700"
          >
            <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-900">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="size-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span>📦</span>
              )}
            </div>
            <div>
              <p className="text-[15px] font-semibold text-slate-100">{p.name}</p>
              <p className="mt-1 text-xs text-slate-400">
                {p.sold} units sold • {formatMoney(p.revenue)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopProducts;