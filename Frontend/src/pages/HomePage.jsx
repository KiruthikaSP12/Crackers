import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function HomePage() {
  const { products } = useStore();

  return (
    <div className="page-grid">

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            🔥 #1 Premium Cracker Store
          </span>

          <h1>
            Light Up Your Celebrations
            <br />
            <span>With Every Spark</span>
          </h1>

          <p className="hero-desc">
            From vibrant sparklers to booming aerial shells —
            experience authentic Sivakasi fireworks crafted with
            tradition, care, and the finest quality.
          </p>

          <div className="button-row">
            <Link className="primary-btn" to="/products">
              🛒 Explore Shop
            </Link>

            <Link className="ghost-btn" to="/offers">
              🏷️ Today's Offers
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>100+</h3>
              <span>Products</span>
            </div>

            <div>
              <h3>15+</h3>
              <span>Brands</span>
            </div>

            <div>
              <h3>15,000+</h3>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="floating-badge badge-left">
            ⭐ 4.9<br/>
            <span>2.5K+ Reviews</span>
          </div>
          <div className="floating-badge badge-right">
            🏆 Best 2024<br/>
            <span>Fireworks Store</span>
          </div>
          <img
            className="hero-main-img"
            src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9"
            alt="Cracker Kingdom Fireworks"
          />
        </div>
      </section>

      {/* MINIMAL FEATURED PRODUCTS */}
      <section className="home-section minimal-products">
        <div className="section-heading-centered">
          <h2>Our Best Sellers</h2>
          <p>Handpicked favorites for your celebration.</p>
        </div>

        <div className="simple-catalog">
          {products.slice(0, 4).map((product, index) => (
            <article 
              key={product.id} 
              className="simple-product float-always pop-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="img-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="simple-product-copy">
                <h3>{product.name}</h3>
                <strong className="price">₹ {product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}