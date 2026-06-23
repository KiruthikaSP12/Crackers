export default function AboutPage() {
  return (
    <div className="page-grid">
      <section className="about-section panel">
        <div className="section-heading-centered" style={{ marginBottom: "2rem" }}>
          <h2>About Cracker Kingdom</h2>
          <p>Lighting up the skies and bringing joy to every celebration since 2010.</p>
        </div>

        <div style={{ display: "grid", gap: "2rem", lineHeight: "1.8", color: "var(--text)" }}>
          <div>
            <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Our Heritage</h3>
            <p>
              Born in the heart of Sivakasi, the fireworks capital of India, Cracker Kingdom 
              was established with a singular mission: to provide safe, spectacular, and affordable 
              fireworks to families across the country. Over the years, we have mastered the art 
              of blending traditional craftsmanship with modern safety standards to produce pyrotechnics 
              that are both breathtaking and secure.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--secondary)", marginBottom: "0.5rem" }}>Uncompromising Quality</h3>
            <p>
              Every sparkler, rocket, and aerial shell we sell goes through rigorous quality control 
              checks. We source our raw materials ethically and ensure that all products comply with 
              environmental and safety regulations. When you buy from Cracker Kingdom, you are buying 
              peace of mind.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--purple)", marginBottom: "0.5rem" }}>Our Promise to You</h3>
            <p>
              We believe that festivals are all about togetherness and joy. We are committed to delivering 
              your orders safely to your doorstep, providing wholesale pricing, and offering a seamless 
              shopping experience so you can focus on what matters most — celebrating with your loved ones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}