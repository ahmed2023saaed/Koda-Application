import StatCard from "../components/StatCard";
import OrderStatusPanel from "../components/OrderStatusPanel";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";
import Icon from "../components/Icon";
import { formatMoney } from "../utils/formatMoney";
import useDashboard from "../hooks/useDashboard";
import useDashTheme from "../hooks/useDashTheme";

function DashboardPage() {
  const { data, loading, error } = useDashboard();
  const th = useDashTheme();

  if (loading)
    return (
      <div className={`rounded-3xl border p-6 ${th.panel} ${th.muted}`}>
        Loading dashboard...
      </div>
    );

  if (error)
    return <div className={`rounded-3xl border p-6 ${th.error}`}>{error}</div>;

  if (!data) return null;

  const { totals, orderStatus, topProducts, recentOrders } = data;

  const stats = [
    { label: "Total Orders", value: totals.totalOrders, hint: "All orders received", icon: "bag", tone: "emerald" },
    { label: "Pending Orders", value: totals.pendingOrders, hint: "Awaiting action", icon: "clock", tone: "amber" },
    { label: "Revenue", value: formatMoney(totals.revenue), hint: "Total gross revenue", icon: "dollar", tone: "pink" },
    { label: "This Month", value: formatMoney(totals.thisMonth), hint: "Monthly sales target", icon: "cart", tone: "cyan" },
    { label: "Top Product", value: totals.topProduct.name, hint: `${totals.topProduct.sold} sold`, icon: "box", tone: "violet" },
    { label: "Users", value: totals.usersCount, hint: "Registered customers", icon: "users", tone: "slate" },
  ];

  return (
    <div className="space-y-6">
      <div className={`rounded-3xl border p-6 ${th.hero}`}>
        <p className={`text-sm uppercase tracking-[0.35em] ${th.eyebrow}`}>Admin overview</p>
        <h2 className={`mt-2 text-2xl font-semibold ${th.title}`}>Real-time commerce health</h2>
        <p className={`mt-2 ${th.muted}`}>
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard
            key={s.label}
            index={i}
            label={s.label}
            value={s.value}
            hint={s.hint}
            tone={s.tone}
            icon={<Icon name={s.icon} size={28} />}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusPanel counts={orderStatus} />
        <TopProducts products={topProducts} />
      </div>

      <RecentOrders orders={recentOrders} />
    </div>
  );
}

export default DashboardPage;