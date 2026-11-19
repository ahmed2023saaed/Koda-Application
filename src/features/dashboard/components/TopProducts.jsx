import { useState } from "react";
import { formatMoney } from "../data/mockDashboard";
import useDashTheme from "../hooks/useDashTheme";

function ProductImage({ src, alt, boxClass }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${boxClass}`}>
        📦
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-14 w-14 shrink-0 rounded-2xl object-cover"
    />
  );
}

function TopProducts({ products }) {
  const th = useDashTheme();

  return (
    <section className={`rounded-3xl border p-6 ${th.panel}`}>
      <p className={`text-sm uppercase tracking-[0.35em] ${th.eyebrow}`}>Top products</p>
      <h3 className={`mt-2 text-xl font-semibold ${th.title}`}>Best sellers</h3>

      <div className="mt-4 space-y-3">
        {products.map((p) => (
          <article
            key={p.id}
            className={`flex items-center gap-4 rounded-3xl border p-4 ${th.row}`}
          >
            <ProductImage src={p.image} alt={p.name} boxClass={th.imgBox} />
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-semibold ${th.title}`}>{p.name}</p>
              <p className={`text-xs ${th.muted}`}>
                {p.sold} units sold • {formatMoney(p.revenue)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TopProducts;