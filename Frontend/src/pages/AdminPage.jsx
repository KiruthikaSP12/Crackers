import { useStore } from "../context/StoreContext.jsx";

export default function AdminPage() {
  const { dashboard, orders, products, categories, updateOrderStatus, adminCustomers, paymentConfig } = useStore();

  if (!dashboard) {
    return <section className="panel">Loading dashboard...</section>;
  }

  return (
    <div className="admin-grid">
      <section className="panel">
        <h2>Admin Dashboard Module</h2>
        <div className="metrics compact">
          <article>
            <span>Total sales</span>
            <strong>Rs. {dashboard.totalSales}</strong>
          </article>
          <article>
            <span>Orders</span>
            <strong>{dashboard.totalOrders}</strong>
          </article>
          <article>
            <span>Customers</span>
            <strong>{dashboard.totalCustomers}</strong>
          </article>
          <article>
            <span>Average order</span>
            <strong>Rs. {dashboard.customerInsights.averageOrderValue}</strong>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Product and Category Management</h2>
        <p>{products.length} crackers listed across {categories.length} categories.</p>
        {dashboard.lowStockProducts.map((product) => (
          <div key={product.id} className="line-item">
            <div>
              <strong>{product.name}</strong>
              <span>Low stock alert: {product.stock} left</span>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Order Status Control</h2>
        {orders.map((order) => (
          <div key={order.id} className="line-item admin-order-row">
            <div className="admin-order-copy">
              <strong>#{order.id}</strong>
              <span>{order.status}</span>
            </div>
            <div className="line-actions admin-order-actions">
              <button className="ghost" onClick={() => updateOrderStatus(order.id, "Shipped")}>
                Mark shipped
              </button>
              <button className="ghost" onClick={() => updateOrderStatus(order.id, "Delivered")}>
                Mark delivered
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Payment and Customer Insights</h2>
        <p>Top category: {dashboard.customerInsights.topCategory}</p>
        <p>Repeat customers: {dashboard.customerInsights.repeatCustomers}</p>
        <p>Recent orders: {dashboard.recentOrders.map((order) => `#${order.id}`).join(", ")}</p>
        <p>
          Razorpay status: {paymentConfig.enabled ? "Enabled" : "Not configured"}{" "}
          {paymentConfig.keyId ? "(Key set)" : ""}
        </p>
      </section>

      <section className="panel">
        <h2>Customer Orders and Payments</h2>
        {adminCustomers.length === 0 ? (
          <p>No customer accounts yet.</p>
        ) : null}
        {adminCustomers.map((customer) => (
          <div key={customer.id} className="line-item admin-customer-row">
            <div className="admin-customer-copy">
              <strong>{customer.name}</strong>
              <span>{customer.email}</span>
              <span>{customer.phone || "No phone on file"}</span>
              <span>{customer.addresses?.[0] || "No address on file"}</span>
            </div>
            <div className="admin-customer-meta">
              <span>Orders: {customer.orders.length}</span>
              <span>
                Last order:{" "}
                {customer.orders[customer.orders.length - 1]
                  ? `#${customer.orders[customer.orders.length - 1].id}`
                  : "None"}
              </span>
              <span>
                Payments: {customer.payments.length || 0}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
