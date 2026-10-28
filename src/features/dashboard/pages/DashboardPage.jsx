import "./DashboardPage.css";
import Icon from "../components/Icon";
import StatCard from "../components/StatCard";
import OrderStatusPanel from "../components/OrderStatusPanel";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";
import { formatMoney } from "../data/mockDashboard";
import useDashboard from "../hooks/useDashboard";

function DashboardPage() {
  const { data, loading, error } = useDashboard();

  if (loading) return <div className="dh-state">Loading dashboard...</div>;
  if (error) return <div className="dh-state dh-state--error">{error}</div>;
  if (!data) return null;

  const { totals, orderStatus, topProducts, recentOrders } = data;

  return (
    <div className="dh">
      <section className="dh-card">
        <p className="dh-eyebrow">Admin Overview</p>
        <h1 className="dh-title">Real-time commerce health</h1>
        <p className="dh-sub">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </section>

      <div className="dh-stats">
      <StatCard label="Total Orders" value={totals.totalOrders} hint="All orders received" icon={<Icon name="bag" />} color="#10b981" />
<StatCard label="Pending Orders" value={totals.pendingOrders} hint="Awaiting action" icon={<Icon name="clock" />} color="#f59e0b" />
<StatCard label="Revenue" value={formatMoney(totals.revenue)} hint="Total gross revenue" icon={<Icon name="dollar" />} color="#ec4899" />
<StatCard label="This Month" value={formatMoney(totals.thisMonth)} hint="Monthly sales target" icon={<Icon name="cart" />} color="#06b6d4" />
<StatCard label="Top Product" value={totals.topProduct.name} hint={`${totals.topProduct.sold} sold`} icon={<Icon name="box" />} color="#a855f7" />
<StatCard label="Users" value={totals.usersCount} hint="Registered customers" icon={<Icon name="users" />} color="#64748b" />
      </div>

      <div className="dh-two-col">
        <OrderStatusPanel counts={orderStatus} />
        <TopProducts products={topProducts} />
      </div>

      <RecentOrders orders={recentOrders} />
    </div>
  );
}

export default DashboardPage;