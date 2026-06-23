import { useState } from "react";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "Ramesh K.",
      rating: 5,
      date: "October 12, 2025",
      text: "The crackers were amazing! The Sky Shots really lit up the Diwali night. Delivery was perfectly on time."
    },
    {
      id: 2,
      name: "Priya S.",
      rating: 4,
      date: "October 10, 2025",
      text: "Great quality sparklers for the kids. Prices are wholesale and very reasonable. Will buy again."
    },
    {
      id: 3,
      name: "Arun M.",
      rating: 5,
      date: "September 28, 2025",
      text: "Excellent service and safe packaging. None of the items were damaged, and the flower pots lasted a long time."
    }
  ]);

  const [newFeedback, setNewFeedback] = useState({ name: "", text: "", rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.name && newFeedback.text) {
      setFeedbacks([
        {
          id: Date.now(),
          name: newFeedback.name,
          rating: newFeedback.rating,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          text: newFeedback.text
        },
        ...feedbacks
      ]);
      setNewFeedback({ name: "", text: "", rating: 5 });
    }
  };

  return (
    <div className="page-grid">
      <section className="panel">
        <h1>Customer Feedback</h1>
        <p>Read what our happy customers have to say about Cracker Kingdom, or leave your own feedback!</p>
      </section>

      <div className="feedback-layout" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "30px", alignItems: "start" }}>
        
        {/* Feedback List */}
        <div className="feedback-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {feedbacks.map((item) => (
            <div key={item.id} className="feedback-card" style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <strong>{item.name}</strong>
                <span style={{ color: "var(--secondary)", fontSize: "1.2rem", letterSpacing: "2px" }}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</span>
              </div>
              <p style={{ margin: "0 0 10px", lineHeight: "1.5" }}>"{item.text}"</p>
              <small style={{ color: "gray" }}>{item.date}</small>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="feedback-form-panel" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: "0", color: "var(--accent)" }}>Leave Feedback</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "bold" }}>Name</label>
              <input 
                type="text" 
                required 
                placeholder="Your Name" 
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
                value={newFeedback.name}
                onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "bold" }}>Rating</label>
              <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      fontSize: "2.2rem",
                      cursor: "pointer",
                      color: "var(--secondary)",
                      lineHeight: "1",
                      opacity: star <= (hoverRating || newFeedback.rating) ? 1 : 0.3,
                      transition: "opacity 0.2s, transform 0.2s",
                      transform: star <= (hoverRating || newFeedback.rating) ? "scale(1.1)" : "scale(1)"
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "bold" }}>Review</label>
              <textarea 
                required 
                placeholder="Share your experience..." 
                rows="4"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", fontFamily: "inherit" }}
                value={newFeedback.text}
                onChange={(e) => setNewFeedback({...newFeedback, text: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="primary-btn" style={{ width: "100%", padding: "12px", border: "none", borderRadius: "6px", background: "var(--accent)", color: "#fff", cursor: "pointer", fontWeight: "bold", transition: "0.3s" }}>
              Submit Feedback
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
