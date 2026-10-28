import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({
  activePage,
  setActivePage,
  adminUser,
  onOpenAdminAuth,
  onOpenAdminDashboard,
  onLogout,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'insights', label: 'Insights' },
    { id: 'careers', label: 'Careers' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              <img
                src="/t-logo.png"
                alt="Tattvaa Tech Logo"
                className="w-9 h-9 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                TATTVAA TECH
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-blue-600 uppercase">
                IDEAS INTO IMPACT
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 font-semibold bg-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Admin Login/Dashboard + Let's Talk CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Admin Portal Toggle */}
            {adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm"
                  title="Open Admin Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminAuth}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all border border-slate-200/80"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>Admin Login</span>
              </button>
            )}

            {/* Let's Talk Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                activePage === 'contact'
                  ? 'bg-blue-700 text-white shadow-blue-500/25 ring-2 ring-blue-400'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5'
              }`}
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {adminUser ? (
              <button
                onClick={onOpenAdminDashboard}
                className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900 text-white"
              >
                Admin
              </button>
            ) : (
              <button
                onClick={onOpenAdminAuth}
                className="px-2.5 py-1 rounded-full text-xs font-semibold text-blue-600 border border-blue-200"
              >
                Login
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm"
            >
              Let's Talk
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {adminUser ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminDashboard(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Go to Admin Dashboard ({adminUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminAuth(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-blue-200 text-blue-600 text-xs font-bold"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
