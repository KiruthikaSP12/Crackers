import { Link } from "react-router-dom";

export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "Diwali Mega Combo",
      description: "Get 20% off on our premium family assorted boxes. Includes sparklers, fountains, and ground spinners.",
      code: "DIWALI20",
      color: "var(--accent)"
    },
    {
      id: 2,
      title: "Wholesale Sparkler Pack",
      description: "Buy 5 boxes of jumbo sparklers, get 1 absolutely free! Perfect for large gatherings.",
      code: "SPARKLEFREE",
      color: "var(--secondary)"
    },
    {
      id: 3,
      title: "Early Bird Aerials",
      description: "Pre-order your 7-shot and 12-shot aerial shells now and enjoy flat 15% discount.",
      code: "SKY15",
      color: "var(--purple)"
    }
  ];

  return (
    <div className="page-grid">
      <section className="offers-section">
        <div className="section-heading-centered" style={{ marginBottom: "2rem" }}>
          <h2>Exclusive Offers & Combos</h2>
          <p>Light up your celebrations without burning a hole in your pocket.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {offers.map(offer => (
            <div key={offer.id} className="panel" style={{ borderTop: `6px solid ${offer.color}`, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", textAlign: "center" }}>
              <h3 style={{ color: offer.color, fontSize: "1.5rem", margin: 0 }}>{offer.title}</h3>
              <p style={{ color: "var(--muted)", flexGrow: 1, margin: 0, lineHeight: 1.6 }}>{offer.description}</p>
              <div style={{ background: "var(--panel-soft)", padding: "1rem", borderRadius: "12px", border: "1px dashed var(--line)" }}>
                <span style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "4px" }}>Use Code</span>
                <strong style={{ fontSize: "1.2rem", letterSpacing: "2px", color: "var(--text)" }}>{offer.code}</strong>
              </div>
              <Link to="/products" className="primary-btn" style={{ background: offer.color, borderColor: offer.color, width: "100%", boxSizing: "border-box" }}>
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
