import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/contact", form);
      toast.success("Message sent — we will contact you soon");
      setForm({ name: "", email: "", phone: "", address: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>Have questions or need help? Send us a message.</p>

      <div className="contact-grid">
        <div className="form-column">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" required />

            <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
          </form>
        </div>

        <aside className="contact-info">
          <h3>Gym Contact</h3>
          <p><strong>Address:</strong><br/> 123 Gym Street, Fitness City</p>
          <p><strong>Phone:</strong><br/> +1 (555) 123-4567</p>
          <p><strong>Email:</strong><br/> hello@gymai.example</p>
          <p><strong>Hours:</strong><br/> Mon–Fri: 6am–10pm<br/>Sat–Sun: 8am–8pm</p>
          <div className="map-placeholder">Map / Directions</div>
        </aside>
      </div>
    </div>
  );
}
