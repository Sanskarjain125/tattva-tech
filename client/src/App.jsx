import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppChatWidget from './components/WhatsAppChatWidget';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Work from './pages/Work';
import About from './pages/About';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

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

  const navigateToSection = (pageId) => {
    const wasOnCareersPage = activePage === 'careers';
    setActivePage(pageId);
    if (pageId === 'careers') {
      window.scrollTo({ top: 0 });
      window.history.replaceState(null, '', '#careers');
      return;
    }

    window.history.replaceState(null, '', `#${pageId}`);
    if (wasOnCareersPage) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      return;
    }

    document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const sectionIds = ['home', 'services', 'products', 'work', 'about', 'insights', 'faq', 'contact'];
    let ticking = false;

    const updateScrollState = () => {
      if (window.location.hash === '#careers') return;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentSection = sectionIds
          .filter((id) => {
            const section = document.getElementById(id);
            return section && section.getBoundingClientRect().top <= 140;
          })
          .pop();
        if (currentSection) setActivePage(currentSection);
        ticking = false;
      });
    };

    const initialHash = window.location.hash.slice(1);
    if (initialHash === 'careers') {
      setActivePage('careers');
      window.scrollTo({ top: 0 });
    } else if (sectionIds.includes(initialHash)) {
      window.requestAnimationFrame(() => {
        document.getElementById(initialHash)?.scrollIntoView({ block: 'start' });
        updateScrollState();
      });
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;

    const hasCardSurface = (element) => {
      if (!(element instanceof HTMLElement)) return false;
      if (element.matches('article, .glass-card')) return true;

      const classes = Array.from(element.classList);
      const hasRoundedShape = classes.some((className) => /^rounded-(xl|2xl|3xl)$/.test(className));
      const hasCardShadow = classes.some((className) => /^shadow-(sm|md|lg|xl|2xl)$/.test(className));
      const hasPadding = classes.some((className) => /^p-(\d+(?:\.\d+)?|px|py|pt|pb|pl|pr)(?:-|$)/.test(className));
      return hasRoundedShape && hasCardShadow && hasPadding;
    };

    const prepareCards = (node) => {
      if (!(node instanceof HTMLElement)) return;
      const candidates = [];
      if (hasCardSurface(node)) candidates.push(node);
      candidates.push(...node.querySelectorAll('article, .glass-card, [class*="rounded-"][class*="shadow-"]'));

      candidates.forEach((card) => {
        if (!(card instanceof HTMLElement) || !hasCardSurface(card)) return;
        if (!card.closest('main')) return;
        if (card.closest('.tilt-exempt-modal, .product-card, .work-card, .insights-card, .contact-form-card, .location-card, .home-hero-orbit-stage, .about-page') || card.matches('.lifecycle-step-card')) return;
        if (card.parentElement?.closest('.tilt-card')) return;
        card.classList.add('tilt-card');
      });
    };

    prepareCards(main);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(prepareCards);
      });
    });
    mutationObserver.observe(main, { childList: true, subtree: true });

    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeCard = null;

    const resetTilt = (card) => {
      if (!card) return;
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--tilt-shadow-x');
      card.style.removeProperty('--tilt-shadow-y');
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse' || !canTilt.matches || reduceMotion.matches) return;

      const target = event.target;
      const nextCard = target instanceof Element ? target.closest('.tilt-card') : null;
      if (activeCard !== nextCard) {
        resetTilt(activeCard);
        activeCard = nextCard && main.contains(nextCard) ? nextCard : null;
      }

      if (!activeCard) return;

      const bounds = activeCard.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      if (bounds.width / bounds.height > 1.6) {
        resetTilt(activeCard);
        activeCard = null;
        return;
      }

      const horizontalPosition = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      const verticalPosition = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));

      activeCard.style.setProperty('--tilt-x', `${(verticalPosition * -30).toFixed(2)}deg`);
      activeCard.style.setProperty('--tilt-y', `${(horizontalPosition * 30).toFixed(2)}deg`);
      activeCard.style.setProperty('--tilt-shadow-x', `${(horizontalPosition * -24).toFixed(1)}px`);
      activeCard.style.setProperty('--tilt-shadow-y', `${(verticalPosition * -24 + 20).toFixed(1)}px`);
      activeCard.classList.add('is-tilting');
    };

    const handlePointerLeave = () => {
      resetTilt(activeCard);
      activeCard = null;
    };

    const handleMotionPreferenceChange = () => {
      if (reduceMotion.matches || !canTilt.matches) handlePointerLeave();
    };

    main.addEventListener('pointermove', handlePointerMove, { passive: true });
    main.addEventListener('pointerleave', handlePointerLeave);
    reduceMotion.addEventListener('change', handleMotionPreferenceChange);
    canTilt.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      mutationObserver.disconnect();
      main.removeEventListener('pointermove', handlePointerMove);
      main.removeEventListener('pointerleave', handlePointerLeave);
      reduceMotion.removeEventListener('change', handleMotionPreferenceChange);
      canTilt.removeEventListener('change', handleMotionPreferenceChange);
      resetTilt(activeCard);
    };
  }, []);

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
    navigateToSection('home');
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
      <>
        <AdminLayout
          activeTab={adminTab}
          setActiveTab={setAdminTab}
          adminUser={adminUser}
          onLogout={handleLogout}
          onBackToPublicSite={() => setIsAdminView(false)}
        >
          {renderAdminTab()}
        </AdminLayout>
        <WhatsAppChatWidget />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fbff] text-slate-800 antialiased relative">
      {/* Navbar with Admin Portal Trigger */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateToSection}
        adminUser={adminUser}
        onOpenAdminAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminDashboard={handleOpenAdminPortal}
        onLogout={handleLogout}
      />

      {/* Main Public View */}
      <main className="flex-1">
        {activePage === 'careers' ? (
          <Careers setActivePage={navigateToSection} />
        ) : (
          <>
            <section id="home" className="public-section">
              <Home setActivePage={navigateToSection} />
            </section>
            <section id="services" className="public-section">
              <Services setActivePage={navigateToSection} />
            </section>
            <section id="products" className="public-section">
              <Products setActivePage={navigateToSection} />
            </section>
            <section id="work" className="public-section">
              <Work setActivePage={navigateToSection} />
            </section>
            <section id="about" className="public-section">
              <About setActivePage={navigateToSection} />
            </section>
            <section id="insights" className="public-section">
              <Insights setActivePage={navigateToSection} />
            </section>
            <section id="faq" className="public-section">
              <FAQ setActivePage={navigateToSection} />
            </section>
            <section id="contact" className="public-section">
              <Contact />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={navigateToSection} />

      <WhatsAppChatWidget />

      {/* Admin Authentication Modal (Login / Signup) */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
