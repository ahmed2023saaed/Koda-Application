const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function mapDashboard(d) {
  const top = d.topProducts?.[0];

  return {
    totals: {
      totalOrders: d.orders.total,
      pendingOrders: d.orders.pending,
      revenue: d.revenue.total,
      thisMonth: d.revenue.thisMonth,
      usersCount: d.totalCustomers,
      topProduct: top
        ? { name: top.name, sold: top.totalSold }
        : { name: "—", sold: 0 },
    },

    orderStatus: {
      pending: d.orders.pending,
      processing: d.orders.processing,
      confirmed: d.orders.confirmed,
      shipped: d.orders.shipped,
      delivered: d.orders.delivered,
      cancelled: d.orders.cancelled,
    },

    topProducts: (d.topProducts ?? []).map((p) => ({
      id: p._id,
      name: p.name,
      sold: p.totalSold,
      revenue: p.revenue,
      image: p.image,
    })),

    recentOrders: (d.recentOrders ?? []).map((o) => ({
      id: o._id,
      customer: o.user?.username ?? o.shippingAddress?.fullName ?? "Customer",
      product: o.items?.[0]?.name ?? "—",
      date: formatDate(o.createdAt),
      status: o.status,
      total: o.totalPrice,
    })),
  };
}