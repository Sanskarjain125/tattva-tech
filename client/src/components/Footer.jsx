import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Twitter, Linkedin, Github, Globe, Heart, Instagram, Building2 } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800/80">
          
          {/* Brand Info (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-9 h-9 relative flex items-center justify-center">
                <img
                  src="/t-logo.png"
                  alt="Tattvaa Tech Logo"
                  className="w-9 h-9 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  TATTVAA TECH
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                  IDEAS INTO IMPACT
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Tattvaa Tech builds modern software, AI solutions and SaaS products that help ambitious businesses grow, automate and scale.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/tattvaa-tech/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#0077b5] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/p/De_tXnDNWst/?mdxt=aHB0d2lqeDc0YjNk"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://tattvatech.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Website"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-blue-400 transition-colors">
                  SaaS Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('work')} className="hover:text-blue-400 transition-colors">
                  Case Studies & Work
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-blue-400 transition-colors">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions / Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Products & Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-blue-400 transition-colors">
                  MailPilot (Email Automation)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-blue-400 transition-colors">
                  LeadFlow CRM
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-blue-400 transition-colors">
                  AI Agent Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-blue-400 transition-colors">
                  InsightBoard Analytics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors">
                  Custom AI Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors">
                  Mobile & Web Apps
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:nkjain796@gmail.com" className="hover:text-white transition-colors break-all">
                  nkjain796@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+919131195754" className="hover:text-white transition-colors">
                  +91 91311 95754
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Gurugram • Gwalior • Saharanpur</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => handleNav('contact')}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Office Locations Strip */}
        <div className="py-10 border-b border-slate-800/80">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Our Office Locations
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Gurugram */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <h5 className="text-sm font-bold text-white">Gurugram Office</h5>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                South City - 2, Sector 49, Gurugram, Haryana
              </p>
            </div>

            {/* Gwalior */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <h5 className="text-sm font-bold text-white">Gwalior Office</h5>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tansen Nagar, Gwalior, Madhya Pradesh
              </p>
            </div>

            {/* Saharanpur */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <h5 className="text-sm font-bold text-white">Saharanpur Office</h5>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                6/1400 New Jawahar Park, Behind Bhuteshwar Mandir, Raghav Puram, Saharanpur, Uttar Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tattvaa Tech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
