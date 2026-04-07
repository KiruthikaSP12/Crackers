import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, addProductToCart, submitReview } = useStore();
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <section className="panel">Product not found.</section>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitReview(product.id, review.rating, review.comment);
    setReview({ rating: 5, comment: "" });
  };

  return (
    <section className="detail-grid">
      <article className="panel">
        <img className="detail-image" src={product.image} alt={product.name} />
      </article>
      <article className="panel detail-copy">
        <span className="pill">{product.type}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="detail-meta">
          <div>
            <span>Price</span>
            <strong>Rs. {product.price}</strong>
          </div>
          <div>
            <span>Cracker count</span>
            <strong>{product.crackerCount}</strong>
          </div>
          <div>
            <span>Popularity</span>
            <strong>{product.popularity}%</strong>
          </div>
          <div>
            <span>Rating</span>
            <strong>{product.rating}</strong>
          </div>
        </div>
        <button onClick={() => addProductToCart(product.id)}>Add this cracker pack</button>
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Review and rating module</h3>
          <select
            value={review.rating}
            onChange={(event) => setReview((current) => ({ ...current, rating: Number(event.target.value) }))}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} stars
              </option>
            ))}
          </select>
          <textarea
            rows="4"
            placeholder="Share your review"
            value={review.comment}
            onChange={(event) => setReview((current) => ({ ...current, comment: event.target.value }))}
          />
          <button type="submit">Submit review</button>
        </form>
      </article>
    </section>
  );
}
