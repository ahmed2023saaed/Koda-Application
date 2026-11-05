const STATUSES = [
  { key: "pending", label: "Pending", tone: "text-amber-300 border-amber-400/30 bg-amber-400/10" },
  { key: "processing", label: "Processing", tone: "text-sky-400 border-sky-400/30 bg-sky-400/10" },
  { key: "confirmed", label: "Confirmed", tone: "text-sky-300 border-sky-300/30 bg-sky-300/10" },
  { key: "shipped", label: "Shipped", tone: "text-indigo-300 border-indigo-300/30 bg-indigo-300/10" },
  { key: "delivered", label: "Delivered", tone: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  { key: "cancelled", label: "Cancelled", tone: "text-rose-400 border-rose-400/30 bg-rose-400/10" },
];

function OrderStatusPanel({ counts }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">Order Status</p>
          <h2 className="text-xl font-semibold text-slate-50">Live fulfillment breakdown</h2>
        </div>
        <span className="whitespace-nowrap rounded-full border border-emerald-800 bg-emerald-950 px-3.5 py-1.5 text-xs text-emerald-400">
          Updated from API
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {STATUSES.map((s) => (
          <div key={s.key} className={`rounded-2xl border px-5 py-4 ${s.tone}`}>
            <p className="text-xs uppercase tracking-[0.2em]">{s.label}</p>
            <p className="mt-3 text-3xl font-bold">{counts[s.key] ?? 0}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderStatusPanel;