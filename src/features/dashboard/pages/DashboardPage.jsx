import StatCard from "../components/StatCard";
import OrderStatusPanel from "../components/OrderStatusPanel";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";
import Icon from "../components/Icon";
import { formatMoney } from "../data/mockDashboard";
import useDashboard from "../hooks/useDashboard";

function DashboardPage() {
  const { data, loading, error } = useDashboard();

  if (loading)
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-400">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-300">
        {error}
      </div>
    );

  if (!data) return null;

  const { totals, orderStatus, topProducts, recentOrders } = data;

  return (
    <div className="flex flex-col gap-5 text-slate-100">
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">Admin Overview</p>
        <h1 className="mb-2 text-3xl font-bold text-slate-50">Real-time commerce health</h1>
        <p className="text-slate-400">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Orders" value={totals.totalOrders} hint="All orders received" icon={<Icon name="bag" />} tone="emerald" />
        <StatCard label="Pending Orders" value={totals.pendingOrders} hint="Awaiting action" icon={<Icon name="clock" />} tone="amber" />
        <StatCard label="Revenue" value={formatMoney(totals.revenue)} hint="Total gross revenue" icon={<Icon name="dollar" />} tone="pink" />
        <StatCard label="This Month" value={formatMoney(totals.thisMonth)} hint="Monthly sales target" icon={<Icon name="cart" />} tone="cyan" />
        <StatCard label="Top Product" value={totals.topProduct.name} hint={`${totals.topProduct.sold} sold`} icon={<Icon name="box" />} tone="purple" />
        <StatCard label="Users" value={totals.usersCount} hint="Registered customers" icon={<Icon name="users" />} tone="slate" />
      </div>

      <div className="grid items-stretch gap-5 lg:grid-cols-[1.6fr_1fr]">
        <OrderStatusPanel counts={orderStatus} />
        <TopProducts products={topProducts} />
      </div>

      <RecentOrders orders={recentOrders} />
    </div>
  );
}

export default DashboardPage;