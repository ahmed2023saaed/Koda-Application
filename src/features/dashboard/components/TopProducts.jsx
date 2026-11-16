import { formatMoney } from "../data/mockDashboard";
import useDashTheme from "../hooks/useDashTheme";

function TopProducts({ products }) {
  const th = useDashTheme();

  return (
    <section className={`rounded-3xl border p-6 ${th.panel}`}>
      <p className={`mb-2 text-xs uppercase tracking-[0.3em] ${th.eyebrow}`}>Top Products</p>
      <h2 className={`text-xl font-semibold ${th.title}`}>Best sellers</h2>

      <div className="mt-4 flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 ${th.row}`}
          >
            <div className={`grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl ${th.imgBox}`}>
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
              <p className={`text-[15px] font-semibold ${th.strong}`}>{p.name}</p>
              <p className={`mt-1 text-xs ${th.muted}`}>
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