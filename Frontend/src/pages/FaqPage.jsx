export default function FaqPage() {
  return (
    <div className="page-grid">
      <section className="panel">
        <h1 style={{ color: "var(--accent)" }}>Frequently Asked Questions</h1>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <strong>How do I place an order?</strong>
            <p>You can browse our products, add them to your cart, and proceed to checkout securely.</p>
          </div>
          <div>
            <strong>What are the delivery times?</strong>
            <p>Orders are typically delivered within 3-5 business days depending on your location.</p>
          </div>
          <div>
            <strong>Are the fireworks safe?</strong>
            <p>Yes, all our fireworks adhere to strict safety standards. Always follow the instructions on the packaging.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
