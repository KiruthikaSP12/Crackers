export default function PrivacyPage() {
  return (
    <div className="page-grid">
      <section className="panel">
        <h1 style={{ color: "var(--accent)" }}>Privacy Policy</h1>
        <p>Last updated: October 2026</p>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <p>At Cracker Kingdom, your privacy is our priority. We are committed to protecting your personal information.</p>
          <p>We collect information such as your name, email, and shipping address solely for fulfilling orders and improving our services. We do not sell or share your data with third parties.</p>
          <p>If you have any questions about how we handle your data, please contact our support team.</p>
        </div>
      </section>
    </div>
  );
}
