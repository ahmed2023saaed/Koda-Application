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
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={`text-sm uppercase tracking-[0.35em] ${th.eyebrow}`}>Order status</p>
          <h3 className={`mt-2 text-xl font-semibold ${th.title}`}>Live fulfillment breakdown</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${th.greenPill}`}>Updated from API</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {STATUSES.map((s) => (
          <article key={s.key} className={`rounded-3xl border p-4 ${th.status[s.key]}`}>
            <p className="text-sm uppercase tracking-[0.25em]">{s.label}</p>
            <p className="mt-3 text-3xl font-semibold">{counts[s.key] ?? 0}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OrderStatusPanel;