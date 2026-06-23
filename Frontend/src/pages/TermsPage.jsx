export default function TermsPage() {
  return (
    <div className="page-grid">
      <section className="panel">
        <h1 style={{ color: "var(--accent)" }}>Terms of Service</h1>
        <p>Last updated: October 2026</p>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <p>By accessing or using the Cracker Kingdom website, you agree to be bound by these Terms of Service.</p>
          <p>You must be at least 18 years old to purchase fireworks. All sales are final unless damaged upon delivery.</p>
          <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
        </div>
      </section>
    </div>
  );
}
