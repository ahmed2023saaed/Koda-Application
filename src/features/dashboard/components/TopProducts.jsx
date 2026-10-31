import { formatMoney } from "../data/mockDashboard";

function TopProducts({ products }) {
  return (
    <section className="dh-card">
      <p className="dh-eyebrow">Top Products</p>
      <h2 className="dh-card__title">Best sellers</h2>

      <div className="dh-list">
        {products.map((p) => (
          <div className="dh-product" key={p.id}>
            <div className="dh-product__img">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span>📦</span>
              )}
            </div>
            <div>
              <p className="dh-product__name">{p.name}</p>
              <p className="dh-product__meta">
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