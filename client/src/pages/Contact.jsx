import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Instagram,
  Linkedin,
  Building2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendContactMessage } from '../services/contactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side quick validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    try {
      setLoading(true);
      const res = await sendContactMessage(formData);
      setSuccess(res.message || 'Your message has been sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', company: '', message: '' });

      // Trigger festive celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#38bdf8', '#0ea5e9', '#60a5fa'],
      });
    } catch (err) {
      setError(err.message || 'Something went wrong while sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= MAIN CONTAINER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ================= LEFT COLUMN (Screen 7) ================= */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Get in Touch
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Let's Build Something Amazing Together.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Have an idea or a project in mind? Let's discuss how Tattvaa Tech can help you turn it into a successful digital product.
            </p>

            {/* Contact Details List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Email</div>
                  <a href="mailto:nkjain796@gmail.com" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    nkjain796@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Phone</div>
                  <a href="tel:+919131195754" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    +91 91311 95754
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Offices</div>
                  <div className="text-sm font-bold text-slate-900">
                    Gurugram • Gwalior • Saharanpur
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Follow Us:
              </span>
              <a
                href="https://www.linkedin.com/company/tattvaa-tech/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#0077b5] text-slate-700 hover:text-white text-xs font-semibold transition-all shadow-xs"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/p/De_tXnDNWst/?mdxt=aHB0d2lqeDc0YjNk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-gradient-to-r hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-slate-700 hover:text-white text-xs font-semibold transition-all shadow-xs"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Stylized 3D Paper Plane Graphic (Matching Screen 7) */}
            <div className="pt-4 relative flex items-center justify-start">
              <div className="relative w-48 h-36">
                {/* Glowing trail */}
                <div className="absolute top-8 left-4 w-32 h-16 bg-gradient-to-r from-blue-400/20 via-sky-300/30 to-transparent blur-xl"></div>
                
                {/* 3D Paper Plane SVG with faceted shading */}
                <svg
                  className="w-40 h-32 drop-shadow-[0_15px_25px_rgba(37,99,235,0.25)] animate-float-medium"
                  viewBox="0 0 200 160"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="planeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="planeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="planeGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>

                  {/* Right Wing */}
                  <polygon points="20,130 180,20 120,140" fill="url(#planeGrad1)" />
                  {/* Left Wing / Center fold */}
                  <polygon points="20,130 180,20 70,85" fill="url(#planeGrad2)" />
                  {/* Under body keel */}
                  <polygon points="70,85 120,140 100,155" fill="url(#planeGrad3)" opacity="0.9" />
                </svg>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: FORM CARD (Screen 7) ================= */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-xl shadow-blue-500/5 text-left">
              
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h3>

              {/* Status messages */}
              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Message Delivered</div>
                    <div className="mt-0.5">{success}</div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Submission Notice</div>
                    <div className="mt-0.5">{error}</div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Your Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Your Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Company (Optional) */}
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Tell us about your project... */}
                <div>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                {/* Send Message Button (Screen 7) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>🔒 Strict NDA & Client Confidentiality</span>
                <span>Response within 24h</span>
              </div>

            </div>
          </div>

        </div>

        {/* ================= OFFICE LOCATIONS SECTION ================= */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Visit Our Office Locations
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We operate across multiple tech delivery hubs to support clients and teams seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gurugram */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                Haryana
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Gurugram Office
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                South City - 2, Sector 49, Gurugram, Haryana
              </p>
            </div>

            {/* Gwalior */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-full mb-3">
                Madhya Pradesh
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Gwalior Office
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tansen Nagar, Gwalior, Madhya Pradesh
              </p>
            </div>

            {/* Saharanpur */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-purple-600 uppercase bg-purple-50 px-2.5 py-1 rounded-full mb-3">
                Uttar Pradesh
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Saharanpur Office
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                6/1400 New Jawahar Park, Behind Bhuteshwar Mandir, Raghav Puram, Saharanpur, Uttar Pradesh
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
