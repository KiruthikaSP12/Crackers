export default function RefundPage() {
  return (
    <div className="page-grid">
      <section className="panel">
        <h1 style={{ color: "var(--accent)" }}>Refund Policy</h1>
        <p>Last updated: October 2026</p>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <p>We want you to be completely satisfied with your purchase from Cracker Kingdom.</p>
          <p>Due to the nature of our products, we only accept returns or offer refunds for items that are defective or damaged during shipping. You must contact us within 48 hours of delivery.</p>
          <p>Please provide photographic evidence of the damage when requesting a refund. Approved refunds will be processed back to your original payment method within 5-7 business days.</p>
        </div>
      </section>
    </div>
  );
}
