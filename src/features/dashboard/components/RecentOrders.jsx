import { formatMoney } from "../data/mockDashboard";

const BADGES = {
  confirmed: "bg-emerald-950 text-emerald-400",
  delivered: "bg-emerald-950 text-emerald-400",
  returned: "bg-yellow-950 text-yellow-400",
  pending: "bg-amber-950 text-amber-400",
  processing: "bg-sky-950 text-sky-400",
  shipped: "bg-indigo-950 text-indigo-300",
  cancelled: "bg-rose-950 text-rose-400",
};

function RecentOrders({ orders }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">Recent Orders</p>
          <h2 className="text-xl font-semibold text-slate-50">Latest customer activity</h2>
        </div>
        <span className="whitespace-nowrap rounded-full border border-cyan-900 bg-cyan-950 px-3.5 py-1.5 text-xs text-cyan-400">
          {orders.length} orders
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-slate-700 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-[15px] font-semibold text-slate-100">{o.customer}</p>
              <p className="mt-1 text-xs text-slate-400">
                {o.product} • {o.date}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3.5">
              <span className={`rounded-full px-3.5 py-1.5 text-sm lowercase ${BADGES[o.status] ?? "bg-slate-800 text-slate-300"}`}>
                {o.status}
              </span>
              <strong className="text-slate-50">{formatMoney(o.total)}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentOrders;