import { formatMoney } from "../data/mockDashboard";
import useDashTheme from "../hooks/useDashTheme";

function RecentOrders({ orders }) {
  const th = useDashTheme();

  return (
    <section className={`rounded-3xl border p-6 ${th.panel}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`mb-2 text-xs uppercase tracking-[0.3em] ${th.eyebrow}`}>Recent Orders</p>
          <h2 className={`text-xl font-semibold ${th.title}`}>Latest customer activity</h2>
        </div>
        <span className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs ${th.cyanPill}`}>
          {orders.length} orders
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className={`flex flex-col justify-between gap-3 rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 sm:flex-row sm:items-center ${th.row}`}
          >
            <div>
              <p className={`text-[15px] font-semibold ${th.strong}`}>{o.customer}</p>
              <p className={`mt-1 text-xs ${th.muted}`}>
                {o.product} • {o.date}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3.5">
              <span
                className={`rounded-full px-3.5 py-1.5 text-sm lowercase ${th.badge[o.status] ?? th.badgeDefault}`}
              >
                {o.status}
              </span>
              <strong className={th.title}>{formatMoney(o.total)}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentOrders;