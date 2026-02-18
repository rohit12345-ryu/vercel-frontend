import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/contact.css";

export default function Membership() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", plan: "standard", startDate: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/membership", form);
      toast.success("Membership request received — we'll reach out soon");
      setForm({ name: "", email: "", phone: "", address: "", plan: "standard", startDate: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit membership");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2>Book Membership / Gym Access</h2>
      <p>Choose a plan and preferred start date to book access.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

        <select name="plan" value={form.plan} onChange={handleChange}>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>

        <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="Preferred start date" type="date" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Additional notes" />

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Booking"}</button>
      </form>
    </div>
  );
}
