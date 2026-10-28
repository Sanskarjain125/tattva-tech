import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Work from './pages/Work';
import About from './pages/About';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Admin System
import AdminAuthModal from './components/admin/AdminAuthModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminInsights from './pages/admin/AdminInsights';
import AdminJobs from './pages/admin/AdminJobs';
import AdminApplications from './pages/admin/AdminApplications';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminTab, setAdminTab] = useState('overview');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  // Initialize admin state from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('tattva_admin_token');
    const savedUser = localStorage.getItem('tattva_admin_user');
    if (savedToken && savedUser) {
      try {
        setAdminToken(savedToken);
        setAdminUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('tattva_admin_token');
        localStorage.removeItem('tattva_admin_user');
      }
    }

    // Check if URL contains /admin
    if (window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin')) {
      if (savedToken) {
        setIsAdminView(true);
      } else {
        setIsAuthModalOpen(true);
      }
    }
  }, []);

  const handleAuthSuccess = (user, token) => {
    setAdminUser(user);
    setAdminToken(token);
    setIsAdminView(true);
    setAdminTab('overview');
  };

  const handleLogout = () => {
    localStorage.removeItem('tattva_admin_token');
    localStorage.removeItem('tattva_admin_user');
    setAdminUser(null);
    setAdminToken(null);
    setIsAdminView(false);
    setActivePage('home');
  };

  const handleOpenAdminPortal = () => {
    if (adminToken && adminUser) {
      setIsAdminView(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Render Admin View
  if (isAdminView && adminToken) {
    const renderAdminTab = () => {
      switch (adminTab) {
        case 'overview':
          return <AdminDashboard token={adminToken} setActiveTab={setAdminTab} />;
        case 'contacts':
          return <AdminContacts token={adminToken} />;
        case 'products':
          return <AdminProducts token={adminToken} />;
        case 'projects':
          return <AdminProjects token={adminToken} />;
        case 'insights':
          return <AdminInsights token={adminToken} />;
        case 'jobs':
          return <AdminJobs token={adminToken} />;
        case 'applications':
          return <AdminApplications token={adminToken} />;
        default:
          return <AdminDashboard token={adminToken} setActiveTab={setAdminTab} />;
      }
    };

    return (
      <AdminLayout
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        adminUser={adminUser}
        onLogout={handleLogout}
        onBackToPublicSite={() => setIsAdminView(false)}
      >
        {renderAdminTab()}
      </AdminLayout>
    );
  }

  // Render Public Website
  const renderPublicPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'services':
        return <Services setActivePage={setActivePage} />;
      case 'products':
        return <Products setActivePage={setActivePage} />;
      case 'work':
        return <Work setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'insights':
        return <Insights setActivePage={setActivePage} />;
      case 'careers':
        return <Careers setActivePage={setActivePage} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fbff] text-slate-800 antialiased relative">
      {/* Navbar with Admin Portal Trigger */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        adminUser={adminUser}
        onOpenAdminAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminDashboard={handleOpenAdminPortal}
        onLogout={handleLogout}
      />

      {/* Main Public View */}
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Admin Authentication Modal (Login / Signup) */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
