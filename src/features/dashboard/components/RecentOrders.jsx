import { formatMoney } from "../data/mockDashboard";

function RecentOrders({ orders }) {
  return (
    <section className="dh-card">
      <div className="dh-card__head">
        <div>
          <p className="dh-eyebrow">Recent Orders</p>
          <h2 className="dh-card__title">Latest customer activity</h2>
        </div>
        <span className="dh-pill dh-pill--cyan">{orders.length} orders</span>
      </div>

      <div className="dh-list">
        {orders.map((o) => (
          <div className="dh-order" key={o.id}>
            <div>
              <p className="dh-order__name">{o.customer}</p>
              <p className="dh-order__meta">
                {o.product} • {o.date}
              </p>
            </div>
            <div className="dh-order__right">
              <span className={`dh-badge dh-badge--${o.status}`}>{o.status}</span>
              <strong>{formatMoney(o.total)}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentOrders;