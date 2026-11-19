import { formatMoney } from "../data/mockDashboard";
import useDashTheme from "../hooks/useDashTheme";

function RecentOrders({ orders }) {
  const th = useDashTheme();

  return (
    <section className={`rounded-3xl border p-6 ${th.panel}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={`text-sm uppercase tracking-[0.35em] ${th.eyebrow}`}>Recent orders</p>
          <h3 className={`mt-2 text-xl font-semibold ${th.title}`}>Latest customer activity</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${th.cyanPill}`}>
          {orders.length} orders
        </span>
      </div>

      <div className="space-y-3">
        {orders.map((o) => (
          <article key={o.id} className={`rounded-3xl border p-4 ${th.orderRow}`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className={`text-sm font-semibold ${th.title}`}>{o.customer}</p>
                <p className={`text-xs ${th.muted}`}>
                  {o.product} • {o.date}
                </p>
              </div>
              <div className={`flex items-center gap-3 text-sm ${th.muted}`}>
                <span
                  className={`rounded-full px-3 py-1 ${th.badge[o.status] ?? th.badgeDefault}`}
                >
                  {o.status}
                </span>
                <span>{formatMoney(o.total)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecentOrders;