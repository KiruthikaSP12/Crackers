export default function ContactPage() {
  return (
    <div className="page-grid contact-page">
      <div className="contact-container">
        
        {/* Left Side: Contact Info Cards */}
        <div className="contact-info-list">
          <div className="contact-info-card">
            <div className="contact-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div className="contact-details">
              <h4>Address</h4>
              <p>42 Sivakasi Lane, TN<br/>Sivakasi, Tamil Nadu 626123</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div className="contact-details">
              <h4>Phone</h4>
              <p>+91 98765 43210<br/>+91 22 1234 5678</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="contact-details">
              <h4>Email</h4>
              <p>hello@crackerkingdom.com<br/>orders@crackerkingdom.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="contact-details">
              <h4>Hours</h4>
              <p>Mon – Fri: 11AM – 11PM<br/>Sat – Sun: 10AM – Midnight</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-panel">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>NAME</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" placeholder="your@email.com" />
              </div>
            </div>
            
            <div className="form-group">
              <label>SUBJECT</label>
              <input type="text" placeholder="How can we help?" />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea placeholder="Your message..." rows="6"></textarea>
            </div>

            <button type="submit" className="primary-btn contact-submit-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}