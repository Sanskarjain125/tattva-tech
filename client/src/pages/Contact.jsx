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
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendContactMessage } from '../services/contactService';
import './Contact.css';

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

  const handleSculpturePointerMove = (event) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(hover: hover) and (pointer: fine)').matches === false ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--sculpture-rotate-x', `${(y * -12).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--sculpture-rotate-y', `${(x * 12).toFixed(2)}deg`);
  };

  const resetSculptureTilt = (event) => {
    event.currentTarget.style.setProperty('--sculpture-rotate-x', '0deg');
    event.currentTarget.style.setProperty('--sculpture-rotate-y', '0deg');
  };

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
            
            <div className="flex items-center gap-3">
              <img
                src="/t-logo.png"
                alt="Tattvaa Tech"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                Get in Touch
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Let's Build Something Amazing Together.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Have an idea or a project in mind? Let's discuss how Tattva Tech can help you turn it into a successful digital product.
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

            <div className="contact-sculpture pt-4 relative flex items-center justify-start">
              <div
                className="contact-sculpture-interactive relative h-40 w-full max-w-[17rem] touch-pan-y"
                onPointerMove={handleSculpturePointerMove}
                onPointerLeave={resetSculptureTilt}
              >
                <div className="contact-sculpture-glow" />
                <div className="contact-sculpture-float">
                  <svg
                    className="contact-sculpture-model"
                    viewBox="0 0 280 190"
                    role="img"
                    aria-label="Floating blue glass-like geometric technology sculpture"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="sculptureTop" x1="83" y1="29" x2="182" y2="89" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F0FCFF" stopOpacity=".96" />
                        <stop offset=".42" stopColor="#7DD3FC" stopOpacity=".88" />
                        <stop offset="1" stopColor="#2563EB" stopOpacity=".94" />
                      </linearGradient>
                      <linearGradient id="sculptureLeft" x1="80" y1="61" x2="126" y2="152" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#BAE6FD" stopOpacity=".9" />
                        <stop offset=".52" stopColor="#38BDF8" stopOpacity=".88" />
                        <stop offset="1" stopColor="#1D4ED8" />
                      </linearGradient>
                      <linearGradient id="sculptureRight" x1="137" y1="73" x2="186" y2="135" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60A5FA" stopOpacity=".94" />
                        <stop offset=".55" stopColor="#2563EB" stopOpacity=".94" />
                        <stop offset="1" stopColor="#172554" />
                      </linearGradient>
                      <linearGradient id="sculptureCore" x1="105" y1="70" x2="165" y2="132" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity=".8" />
                        <stop offset=".35" stopColor="#BAE6FD" stopOpacity=".24" />
                        <stop offset="1" stopColor="#38BDF8" stopOpacity=".06" />
                      </linearGradient>
                      <linearGradient id="sculptureOrbit" x1="43" y1="90" x2="232" y2="111" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#93C5FD" stopOpacity=".08" />
                        <stop offset=".5" stopColor="#38BDF8" stopOpacity=".72" />
                        <stop offset="1" stopColor="#2563EB" stopOpacity=".12" />
                      </linearGradient>
                      <filter id="sculptureShadow" x="48" y="16" width="188" height="166" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                        <feGaussianBlur stdDeviation="9" />
                      </filter>
                    </defs>

                    <ellipse cx="141" cy="151" rx="76" ry="15" fill="#2563EB" fillOpacity=".22" filter="url(#sculptureShadow)" />
                    <ellipse cx="140" cy="96" rx="94" ry="35" stroke="url(#sculptureOrbit)" strokeWidth="1.5" transform="rotate(-18 140 96)" />
                    <ellipse cx="140" cy="96" rx="78" ry="28" stroke="#BAE6FD" strokeOpacity=".24" strokeWidth="1" transform="rotate(32 140 96)" />
                    <circle cx="224" cy="66" r="3.5" fill="#BAE6FD" />
                    <circle cx="59" cy="122" r="2.5" fill="#60A5FA" />

                    <path d="M140 26 190 58 184 112 137 151 82 119 77 62 140 26Z" fill="#1D4ED8" fillOpacity=".12" stroke="#DBF4FF" strokeOpacity=".62" strokeWidth="1.2" />
                    <path d="m140 26 50 32-53 34-60-30 63-36Z" fill="url(#sculptureTop)" />
                    <path d="m77 62 60 30v59l-55-32-5-57Z" fill="url(#sculptureLeft)" />
                    <path d="m137 92 53-34-6 54-47 39V92Z" fill="url(#sculptureRight)" />
                    <path d="m140 26 8 64-11 2-60-30 63-36Z" fill="url(#sculptureCore)" />
                    <path d="m137 92 53-34-34 51-19 42V92Z" fill="#BFDBFE" fillOpacity=".2" />
                    <path d="m82 62 58-36M137 92l47 20M82 119l55-27" stroke="white" strokeOpacity=".55" strokeWidth="1.2" />
                    <path d="m93 69 37 19M145 39l34 21M91 111l37 23" stroke="white" strokeOpacity=".32" strokeWidth="2" strokeLinecap="round" />
                    <path d="M108 54 140 35" stroke="white" strokeOpacity=".74" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: FORM CARD (Screen 7) ================= */}
          <div className="lg:col-span-6">
            <div className="contact-form-card bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-xl shadow-blue-500/5 text-left">
              
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
                <span>Strict NDA & Client Confidentiality</span>
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

          <div className="location-cards grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gurugram */}
            <article className="location-card group">
              <img
                alt="DLF CyberHub in Gurugram"
                className="location-card-image"
                loading="lazy"
                src="/images/gurugram-landmark.png"
              />
              <div className="location-card-shade" />
              <div className="location-card-content">
                <div className="inline-block text-[11px] font-bold text-blue-100 uppercase bg-blue-950/45 border border-white/20 px-2.5 py-1 rounded-full mb-3">
                Haryana
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Gurugram Office</h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  South City - 2, Sector 49, Gurugram, Haryana
                </p>
                <p className="location-photo-credit">
                  {/* Photo: <a href="https://commons.wikimedia.org/wiki/File:DLF_CyberHub_Gurgaon.jpg" rel="noreferrer" target="_blank">ADARSH23456789</a> */}
                  {/* {' · CC0'} */}
                </p>
              </div>
            </article>

            {/* Gwalior */}
            <article className="location-card group">
              <img
                alt="Historic Gwalior Fort"
                className="location-card-image"
                loading="lazy"
                src="/images/gwalior-fort.jpg"
              />
              <div className="location-card-shade" />
              <div className="location-card-content">
                <div className="inline-block text-[11px] font-bold text-emerald-100 uppercase bg-emerald-950/45 border border-white/20 px-2.5 py-1 rounded-full mb-3">
                Madhya Pradesh
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Gwalior Office</h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  Tansen Nagar, Gwalior, Madhya Pradesh
                </p>
                <p className="location-photo-credit">
                  {/* Photo: <a href="https://commons.wikimedia.org/wiki/File:Gwalior_Fort_front.jpg" rel="noreferrer" target="_blank">Anuppyr007</a> */}
                  {/* {' · '} */}
                  {/* <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="noreferrer" target="_blank">CC BY-SA 4.0</a> */}
                </p>
              </div>
            </article>

            {/* Saharanpur */}
            <article className="location-card group">
              <img
                alt="Gandhi Park in Saharanpur at sunset"
                className="location-card-image location-card-image-saharanpur"
                loading="lazy"
                src="/images/saharanpur-office.png"
              />
              <div className="location-card-shade" />
              <div className="location-card-content">
                <div className="inline-block text-[11px] font-bold text-purple-100 uppercase bg-purple-950/45 border border-white/20 px-2.5 py-1 rounded-full mb-3">
                Uttar Pradesh
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Saharanpur Office</h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  6/1400 New Jawahar Park, Behind Bhuteshwar Mandir, Raghav Puram, Saharanpur, Uttar Pradesh
                </p>
                {/* <p className="location-photo-credit"> */}
                  {/* Saharanpur landmark image */}
                {/* </p> */}
              </div>
            </article>
          </div>
        </div>

      </div>
    </div>
  );
}
