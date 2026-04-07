import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function HomePage() {
  const { products, categories, cart, wishlist, notifications, addProductToCart, addProductToWishlist } = useStore();
  const [filters, setFilters] = useState({ query: "", category: "all", sortBy: "popularity", type: "all" });
  const testimonials = [
    {
      name: "Kondal Raj Ramamoorthy",
      place: "Chennai",
      quote: "Excellent service, safe packing, and on-time delivery. The products arrived in great condition."
    },
    {
      name: "Amit Kumar Nayak",
      place: "Bhubaneswar",
      quote: "Easy to order online, budget-friendly pricing, and smooth delivery support for family celebrations."
    },
    {
      name: "Mano Adon",
      place: "Madurai",
      quote: "Very easy to shop. The crackers quality matched what was shown and delivery was timely."
    }
  ];
  const featuredTypes = [
    "Flower Pot",
    "Sparklers",
    "Ground Spinner",
    "Fountain",
    "Rocket",
    "Aerial Shell",
    "7 Shots",
    "Bomb",
    "Garland",
    "Poppers",
    "Whistling"
  ];

  const filteredProducts = useMemo(() => {
    let output = [...products];
    if (filters.query) {
      output = output.filter((item) => item.name.toLowerCase().includes(filters.query.toLowerCase()));
    }
    if (filters.category !== "all") {
      output = output.filter((item) => item.categoryId === Number(filters.category));
    }
    if (filters.type !== "all") {
      output = output.filter((item) => item.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.sortBy === "price-low") output.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price-high") output.sort((a, b) => b.price - a.price);
    else output.sort((a, b) => b.popularity - a.popularity);

    return output;
  }, [filters, products]);

  return (
    <div className="page-grid">
      <section className="storefront-hero panel">
        <div className="hero-copy">
          <p className="eyebrow">Main Modules Live</p>
          <h1>Online Sivakasi crackers shop with trusted wholesale pricing and festive favorites.</h1>
          <p>
            Shop flower pots, sparklers, ground chakkars, fountains, rockets, aerial shots, 7 shots, bombs, garlands,
            poppers, and whistling crackers with quick add-to-cart and wishlist actions.
          </p>
          <div className="button-row">
            <a className="link-button" href="#departments">
              Shop by Department
            </a>
            <a className="ghost link-button" href="#about">
              Why choose us
            </a>
          </div>
        </div>

        <div className="hero-highlights">
          <article>
            <span>Product categories</span>
            <strong>{categories.length}</strong>
          </article>
          <article>
            <span>Items in cart</span>
            <strong>{cart.items.length}</strong>
          </article>
          <article>
            <span>Saved in wishlist</span>
            <strong>{wishlist.length}</strong>
          </article>
          <article>
            <span>Offer alerts</span>
            <strong>{notifications.length}</strong>
          </article>
        </div>
      </section>

      <section id="categories" className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Our Product Categories</p>
            <h2>Browse crackers by family and celebration style</h2>
          </div>
          <Link to="/" className="ghost link-button">
            View all
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={filters.category === String(category.id) ? "category-tile active-category" : "category-tile"}
              onClick={() => setFilters((current) => ({ ...current, category: String(category.id), type: "all" }))}
            >
              <span>{category.name}</span>
              <strong>{products.filter((product) => product.categoryId === category.id).length} items</strong>
            </button>
          ))}
        </div>
      </section>

      <section id="departments" className="shop-layout">
        <aside className="panel department-panel">
          <p className="eyebrow">Shop By Department</p>
          <div className="department-list">
            <label className="department-label" htmlFor="cracker-type">
              Select cracker type
            </label>
            <select
              id="cracker-type"
              className="department-select"
              value={filters.type}
              onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}
            >
              <option value="all">All Crackers</option>
              {featuredTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div className="shop-main">
          <section className="panel filters">
            <input
              type="text"
              placeholder="Search crackers"
              value={filters.query}
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
            />
            <select
              value={filters.category}
              onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={filters.sortBy}
              onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value }))}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
            </select>
          </section>

          <section className="catalog">
            {!filteredProducts.length ? (
              <article className="panel">
                No crackers matched that type or filter. Try another cracker category.
              </article>
            ) : null}
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card panel">
                <img src={product.image} alt={product.name} />
                <div className="product-copy">
                  <div>
                    <span className="pill">{product.type}</span>
                    <span className="muted">Stock {product.stock}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="count-copy">Cracker count: {product.crackerCount}</p>
                  <div className="price-row">
                    <strong>Rs. {product.price}</strong>
                    <span>{product.rating} rating</span>
                  </div>
                </div>
                <div className="button-row">
                  <button onClick={() => addProductToCart(product.id)}>Add to cart</button>
                  <button className="ghost" onClick={() => addProductToWishlist(product.id)}>
                    Wishlist
                  </button>
                  <Link className="ghost link-button" to={`/products/${product.id}`}>
                    Details
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>

      <section className="service-grid">
        <article className="panel service-card">
          <p className="eyebrow">Our Services</p>
          <h3>Quick Delivery</h3>
          <p>Safe dispatch and convenient delivery planning for festive orders and event purchases.</p>
        </article>
        <article className="panel service-card">
          <p className="eyebrow">Support</p>
          <h3>24/7 Help Center</h3>
          <p>Assistance with category selection, bulk purchases, family packs, and seasonal combo orders.</p>
        </article>
        <article className="panel service-card">
          <p className="eyebrow">Pricing</p>
          <h3>Wholesale Value</h3>
          <p>Competitive pricing across Sivakasi crackers with clear browsing, wishlist, and cart flow.</p>
        </article>
      </section>

      <section id="about" className="panel about-section">
        <div>
          <p className="eyebrow">About Cracker Kingdom</p>
          <h2>Trusted online crackers shopping for Diwali, weddings, New Year, and family celebrations</h2>
        </div>
        <p>
          Cracker Kingdom brings together premium Sivakasi fireworks, clean category browsing, fast add-to-cart ordering,
          wishlist support, and role-based admin management. Customers can explore sparklers, flower pots, rockets,
          aerial shots, bombs, ladis, and kid-friendly options in one easy storefront.
        </p>
        <p>
          The experience is built to feel familiar to shoppers looking for a wholesale-style crackers catalog, with a
          department menu, category-led browsing, service highlights, and trust-focused presentation.
        </p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What Our Customers Say</p>
            <h2>Testimonials from festive buyers</h2>
          </div>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="testimonial-card">
              <p>{testimonial.quote}</p>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.place}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="panel contact-section">
        <div>
          <p className="eyebrow">Reach Us On</p>
          <h2>Need help with orders, bulk purchases, or department selection?</h2>
        </div>
        <div className="contact-grid">
          <div className="notice">
            <strong>Call us</strong>
            <p>(+91) 754 002 7151</p>
            <p>(+91) 956 691 3888</p>
          </div>
          <div className="notice">
            <strong>Email support</strong>
            <p>support@crackerkingdom.com</p>
          </div>
          <div className="notice">
            <strong>Coverage</strong>
            <p>Sivakasi direct stock, online ordering, and festival-ready dispatch support.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
