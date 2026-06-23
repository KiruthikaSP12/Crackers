import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function CheckoutPage() {
  const { cart, payWithRazorpay, profile, currentUser } = useStore();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    fullName: currentUser?.name || profile?.name || "",
    phone: profile?.phone || "",
    street: profile?.address || "",
    city: "",
    pincode: ""
  });

  if (!cart?.items?.length && step === 1) {
    navigate("/cart");
    return null;
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Trigger the Razorpay Checkout popup
      await payWithRazorpay();
      
      // If payment is successful, it resolves and we move to Success screen
      setStep(3);
    } catch (err) {
      // If user cancels or online payment is not configured in backend
      alert(err.message || "Payment failed or was cancelled.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-grid" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Progress Steps */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "2px", background: "var(--line)", zIndex: 0 }} />
        
        {["Delivery Address", "Secure Razorpay Checkout", "Order Placed"].map((label, index) => {
          const stepNum = index === 2 ? 3 : index + 1;
          const isActive = step === stepNum || (step === 1 && stepNum === 2 && isProcessing);
          const isCompleted = step > stepNum;
          return (
            <div key={label} style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "var(--bg)", padding: "0 10px" }}>
              <div style={{ 
                width: "36px", height: "36px", borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: "bold",
                background: isActive || isCompleted ? "var(--accent-deep)" : "var(--panel)", 
                color: isActive || isCompleted ? "#fff" : "var(--muted)",
                border: `2px solid ${isActive || isCompleted ? "var(--accent-deep)" : "var(--line)"}`
              }}>
                {isCompleted ? "✓" : stepNum}
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: isActive ? "bold" : "normal", color: isActive ? "var(--text)" : "var(--muted)" }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Address & Trigger Razorpay */}
      {step === 1 && (
        <form onSubmit={handleAddressSubmit} className="panel" style={{ display: "grid", gap: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>Delivery Details</h2>
            <strong style={{ fontSize: "1.2rem", color: "var(--accent-deep)" }}>Total: ₹{cart.total.toFixed(2)}</strong>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="field-label">Full Name</label>
              <input required type="text" className="stack-form" style={{ marginTop: "5px" }} value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} />
            </div>
            <div>
              <label className="field-label">Phone Number</label>
              <input required type="tel" className="stack-form" style={{ marginTop: "5px" }} value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="field-label">Street Address</label>
            <textarea required rows="2" className="stack-form" style={{ marginTop: "5px", width: "100%", borderRadius: "14px", border: "1px solid var(--line)", padding: "1rem" }} value={address.street} onChange={e => setAddress({...address, street: e.target.value})}></textarea>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="field-label">City</label>
              <input required type="text" className="stack-form" style={{ marginTop: "5px" }} value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
            </div>
            <div>
              <label className="field-label">Pincode</label>
              <input required type="text" className="stack-form" style={{ marginTop: "5px" }} value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="primary-btn" disabled={isProcessing} style={{ padding: "14px", fontSize: "1.1rem", background: isProcessing ? "var(--muted)" : "" }}>
            {isProcessing ? "Opening Razorpay Secure Checkout..." : `Pay ₹${cart.total.toFixed(2)} with Razorpay`}
          </button>
        </form>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="panel" style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ fontSize: "5rem", margin: "0 auto 1rem", color: "var(--green, #16a34a)" }}>✅</div>
          <h1 style={{ color: "var(--accent-deep)", margin: "0 0 0.5rem" }}>Payment Successful!</h1>
          <p className="muted" style={{ fontSize: "1.1rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
            Thank you for shopping with Cracker Kingdom. Your festival fireworks are being packed and will be shipped to your address shortly!
          </p>
          <button className="primary-btn" onClick={() => navigate("/products")}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
}
