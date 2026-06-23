import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { products, addProductToCart, addProductToWishlist, currentUser } = useStore();

    const handleAction = (callback) => {
        if (!currentUser) {
            navigate("/login", { state: { from: location.pathname } });
        } else {
            callback();
        }
    };

    return (
        <div className="page-grid">
            <section className="panel">
                <h1>Our Products</h1>
                <p>Browse premium Sivakasi crackers and festive collections.</p>
            </section>

            <section className="catalog">
                {products.map((product, index) => (
                    <article 
                        key={product.id} 
                        className="product-card panel float-always pop-in"
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
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
                            <button onClick={() => handleAction(() => addProductToCart(product.id))}>
                                Add to Cart
                            </button>

                            <button
                                className="ghost"
                                onClick={() => handleAction(() => addProductToWishlist(product.id))}
                            >
                                Wishlist
                            </button>

                            <button
                                className="ghost"
                                onClick={() => handleAction(() => navigate(`/products/${product.id}`))}
                            >
                                Details
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}