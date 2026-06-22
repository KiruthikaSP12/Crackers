import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductsPage() {
    const { products, addProductToCart, addProductToWishlist } = useStore();

    return (
        <div className="page-grid">
            <section className="panel">
                <h1>Our Products</h1>
                <p>Browse premium Sivakasi crackers and festive collections.</p>
            </section>

            <section className="catalog">
                {products.map((product) => (
                    <article key={product.id} className="product-card panel">
                        <img src={product.image} alt={product.name} />

                        <div className="product-copy">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>

                            <div className="price-row">
                                <strong>Rs. {product.price}</strong>
                                <span>{product.rating} Rating</span>
                            </div>
                        </div>

                        <div className="button-row">
                            <button onClick={() => addProductToCart(product.id)}>
                                Add to Cart
                            </button>

                            <button
                                className="ghost"
                                onClick={() => addProductToWishlist(product.id)}
                            >
                                Wishlist
                            </button>

                            <Link
                                className="ghost link-button"
                                to={`/products/${product.id}`}
                            >
                                Details
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}