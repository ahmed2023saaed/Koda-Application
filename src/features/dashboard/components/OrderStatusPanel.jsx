import useDashTheme from "../hooks/useDashTheme";

const STATUSES = [
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

function OrderStatusPanel({ counts }) {
  const th = useDashTheme();

  return (
    <section className={`rounded-3xl border p-6 ${th.panel}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className={`mb-2 text-xs uppercase tracking-[0.3em] ${th.eyebrow}`}>Order Status</p>
          <h2 className={`text-xl font-semibold ${th.title}`}>Live fulfillment breakdown</h2>
        </div>
        <span className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs ${th.greenPill}`}>
          Updated from API
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {STATUSES.map((s) => (
          <div key={s.key} className={`rounded-2xl border px-5 py-4 ${th.status[s.key]}`}>
            <p className="text-xs uppercase tracking-[0.2em]">{s.label}</p>
            <p className="mt-3 text-3xl font-bold">{counts[s.key] ?? 0}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderStatusPanel;