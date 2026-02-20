import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/contact.css";

export default function MembershipContact() {
  const [activeTab, setActiveTab] = useState("membership");

  const [membershipForm, setMembershipForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    plan: "standard",
    startDate: "",
    notes: ""
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleMembershipChange = (e) => setMembershipForm({ ...membershipForm, [e.target.name]: e.target.value });
  const handleContactChange = (e) => setContactForm({ ...contactForm, [e.target.name]: e.target.value });

  const handleMembershipSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/membership", membershipForm);
      toast.success("Membership request received. We will reach out soon");
      setMembershipForm({ name: "", email: "", phone: "", address: "", plan: "standard", startDate: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit membership");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/contact", contactForm);
      toast.success("Message sent. We will contact you soon");
      setContactForm({ name: "", email: "", phone: "", address: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="membership-contact-page">
      <div className="page-header">
        <h2>Get In Touch</h2>
        <p>Join our gym family or send us a message. We are here to help.</p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "membership" ? "active" : ""}`}
          onClick={() => setActiveTab("membership")}
        >
          <span className="tab-icon">Join</span>
          Membership
        </button>
        <button
          className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <span className="tab-icon">Talk</span>
          Contact Us
        </button>
      </div>

      <div className="content-grid">
        <div className="form-section">
          {activeTab === "membership" && (
            <div className="form-card membership-card">
              <div className="form-header">
                <h3>Join Our Gym</h3>
                <p>Choose a plan and start your fitness journey today.</p>
              </div>

              <form onSubmit={handleMembershipSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={membershipForm.name}
                      onChange={handleMembershipChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      name="email"
                      value={membershipForm.email}
                      onChange={handleMembershipChange}
                      placeholder="john@example.com"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={membershipForm.phone}
                      onChange={handleMembershipChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      name="address"
                      value={membershipForm.address}
                      onChange={handleMembershipChange}
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Plan *</label>
                  <div className="plan-options">
                    <label className={`plan-option ${membershipForm.plan === "basic" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="plan"
                        value="basic"
                        checked={membershipForm.plan === "basic"}
                        onChange={handleMembershipChange}
                      />
                      <div className="plan-content">
                        <span className="plan-name">Basic</span>
                        <span className="plan-price">$29/mo</span>
                        <span className="plan-desc">Essential gym access</span>
                      </div>
                    </label>
                    <label className={`plan-option ${membershipForm.plan === "standard" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="plan"
                        value="standard"
                        checked={membershipForm.plan === "standard"}
                        onChange={handleMembershipChange}
                      />
                      <div className="plan-content">
                        <span className="plan-name">Standard</span>
                        <span className="plan-price">$49/mo</span>
                        <span className="plan-desc">Gym + Classes</span>
                      </div>
                    </label>
                    <label className={`plan-option ${membershipForm.plan === "premium" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="plan"
                        value="premium"
                        checked={membershipForm.plan === "premium"}
                        onChange={handleMembershipChange}
                      />
                      <div className="plan-content">
                        <span className="plan-name">Premium</span>
                        <span className="plan-price">$79/mo</span>
                        <span className="plan-desc">All Access + PT</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Start Date</label>
                  <input
                    name="startDate"
                    value={membershipForm.startDate}
                    onChange={handleMembershipChange}
                    type="date"
                  />
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={membershipForm.notes}
                    onChange={handleMembershipChange}
                    placeholder="Any special requirements or questions..."
                    rows="3"
                  />
                </div>

                <button type="submit" className="submit-btn primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Membership Request"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="form-card contact-card">
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Have questions? We would love to hear from you.</p>
              </div>

              <form onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="your@email.com"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      name="address"
                      value={contactForm.address}
                      onChange={handleContactChange}
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="How can we help you?"
                    required
                    rows="4"
                  />
                </div>

                <button type="submit" className="submit-btn primary" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          )}
        </div>

        <aside className="info-sidebar">
          <div className="info-card">
            <h3>Visit Us</h3>
            <div className="info-item">
              <span className="info-icon">Map</span>
              <div>
                <strong>Address</strong>
                <p>123 Gym Street, Fitness City</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">Call</span>
              <div>
                <strong>Phone</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">Mail</span>
              <div>
                <strong>Email</strong>
                <p>hello@gymai.example</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">Time</span>
              <div>
                <strong>Hours</strong>
                <p>Mon-Fri: 6am-10pm</p>
                <p>Sat-Sun: 8am-8pm</p>
              </div>
            </div>
          </div>

          <div className="info-card benefits-card">
            <h3>Member Benefits</h3>
            <ul className="benefits-list">
              <li>24/7 Gym Access</li>
              <li>Group Classes</li>
              <li>Personal Training</li>
              <li>Pool and Sauna</li>
              <li>Nutrition Planning</li>
              <li>AI Workout App</li>
            </ul>
          </div>

          <div className="info-card cta-card">
            <h3>Questions?</h3>
            <p>Call us directly at</p>
            <a href="tel:+15551234567" className="phone-link">+1 (555) 123-4567</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
