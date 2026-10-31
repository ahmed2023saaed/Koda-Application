const STATUSES = [
  { key: "pending", label: "Pending", color: "#fbbf24" },
  { key: "processing", label: "Processing", color: "#38bdf8" },
  { key: "confirmed", label: "Confirmed", color: "#7dd3fc" },
  { key: "shipped", label: "Shipped", color: "#a5b4fc" },
  { key: "delivered", label: "Delivered", color: "#34d399" },
  { key: "cancelled", label: "Cancelled", color: "#fb7185" },
];

function OrderStatusPanel({ counts }) {
  return (
    <section className="dh-card">
      <div className="dh-card__head">
        <div>
          <p className="dh-eyebrow">Order Status</p>
          <h2 className="dh-card__title">Live fulfillment breakdown</h2>
        </div>
        <span className="dh-pill dh-pill--green">Updated from API</span>
      </div>

      <div className="dh-status-grid">
        {STATUSES.map((s) => (
          <div className="dh-status" key={s.key} style={{ "--c": s.color }}>
            <p className="dh-status__label">{s.label}</p>
            <p className="dh-status__value">{counts[s.key] ?? 0}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderStatusPanel;