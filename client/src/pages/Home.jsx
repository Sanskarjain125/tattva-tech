import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Smartphone,
  Globe,
  TrendingUp,
  Cpu,
  CheckCircle,
  ExternalLink,
  Code2,
  Users,
  ShieldCheck,
  Award,
  Bot,
  Palette,
} from 'lucide-react';
import CoreEngineeringStack from '../components/CoreEngineeringStack';
import BrandMarquee from '../components/BrandMarquee';
import './Home.css';

const heroPhrases = ['Digital Products', 'AI Solutions', 'Robotics Systems', 'SaaS Platforms'];

export default function Home({ setActivePage }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState(heroPhrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = (event) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedPhrase(heroPhrases[0]);
      setIsDeleting(false);
      setPhraseIndex(0);
      return undefined;
    }

    const currentPhrase = heroPhrases[phraseIndex];
    let delay;

    if (!isDeleting && displayedPhrase === currentPhrase) {
      delay = window.setTimeout(() => setIsDeleting(true), 1700);
    } else if (isDeleting && displayedPhrase.length === 0) {
      delay = window.setTimeout(() => {
        setPhraseIndex((index) => (index + 1) % heroPhrases.length);
        setIsDeleting(false);
      }, 260);
    } else {
      delay = window.setTimeout(() => {
        setDisplayedPhrase((phrase) => (
          isDeleting ? phrase.slice(0, -1) : currentPhrase.slice(0, phrase.length + 1)
        ));
      }, isDeleting ? 38 : 72);
    }

    return () => window.clearTimeout(delay);
  }, [displayedPhrase, isDeleting, phraseIndex, prefersReducedMotion]);

  const stats = [
    { value: '50+', label: 'Projects Delivered', desc: 'Across 12 countries' },
    { value: '30+', label: 'Happy Clients', desc: 'From startups to enterprise' },
    { value: '5+', label: 'Products in Development', desc: 'High-growth SaaS tools' },
    { value: '100%', label: 'Client Satisfaction', desc: 'Transparent & on-time' },
  ];

  const heroServices = [
    { title: 'AI & Automation', detail: 'Smarter Workflows', icon: Zap, color: 'blue' },
    { title: 'SaaS Products', detail: 'Ready to Scale', icon: Layers, color: 'emerald' },
    { title: 'Web & Mobile Apps', detail: 'Built for Growth', icon: Smartphone, color: 'cyan' },
    { title: 'Robotics & IoT', detail: 'Intelligent Systems', icon: Bot, color: 'violet' },
    { title: 'UI/UX Design', detail: 'Human-Centered', icon: Palette, color: 'indigo' },
    { title: 'Digital Growth', detail: 'Reach More Customers', icon: TrendingUp, color: 'amber' },
  ];

  const heroServiceOrbits = [
    { duration: '30s', services: heroServices.slice(0, 2) },
    { duration: '38s', services: heroServices.slice(2, 4) },
    { duration: '46s', services: heroServices.slice(4, 6) },
  ];

  const partners = [
    { name: 'AWS', icon: 'aws', label: 'Amazon Web Services' },
    { name: 'Google Cloud', icon: 'gcp', label: 'Google Cloud Platform' },
    { name: 'OpenAI', icon: 'openai', label: 'OpenAI' },
    { name: 'Meta', icon: 'meta', label: 'Meta Developer' },
    { name: 'Microsoft', icon: 'msft', label: 'Microsoft for Startups' },
    { name: 'Vercel', icon: 'vercel', label: 'Vercel Cloud' },
  ];

  const renderPartner = ({ name, icon, label }) => (
    <div
      key={name}
      className="flex shrink-0 items-center gap-2 font-semibold text-slate-800"
      aria-label={label}
    >
      {icon === 'aws' && <span className="text-2xl font-black">aws</span>}
      {icon === 'gcp' && (
        <>
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-base">Google Cloud</span>
        </>
      )}
      {icon === 'openai' && (
        <>
          <Cpu className="h-5 w-5 text-emerald-600" />
          <span className="text-base">OpenAI</span>
        </>
      )}
      {icon === 'meta' && <span className="text-lg font-black">∞ Meta</span>}
      {icon === 'msft' && (
        <>
          <span className="grid h-4 w-4 grid-cols-2 gap-0.5" aria-hidden="true">
            <span className="bg-red-500" />
            <span className="bg-green-500" />
            <span className="bg-blue-500" />
            <span className="bg-amber-500" />
          </span>
          <span className="text-base">Microsoft</span>
        </>
      )}
      {icon === 'vercel' && (
        <>
          <span className="text-sm">▲</span>
          <span className="text-base">Vercel</span>
        </>
      )}
    </div>
  );

  return (
    <div className="pt-24 pb-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-transparent -z-10 pointer-events-none blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8 pb-16">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                Technology Partner for a Smarter Tomorrow
              </span>
            </div>

            {/* Headline */}
            <h1
              aria-label="We turn ambitious ideas into digital products, AI solutions, robotics systems, and SaaS platforms that matter."
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              We Turn Ambitious Ideas Into{' '}
              <span className="hero-typewriter" aria-hidden="true">
                <span className="hero-typewriter-measure">Robotics Systems</span>
                <span className="hero-typewriter-text">{displayedPhrase}</span>
                {!prefersReducedMotion && <span className="hero-typewriter-caret" />}
              </span>{' '}
              That Matter.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Tattva Tech builds modern software, AI solutions and SaaS products that help businesses grow, automate and scale.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('contact')}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActivePage('products')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200/90 shadow-sm hover:shadow transition-all duration-200"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust points micro badge */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Modern Tech Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Rapid Prototyping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Dedicated Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: rotating service orbit around the Tattvaa logo */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              className="home-hero-orbit-stage"
              role="img"
              aria-label="Tattvaa Tech services orbiting its logo: AI and automation, SaaS products, web and mobile apps, robotics and IoT, UI/UX design, and digital growth"
            >
              <div className="home-hero-orbit-glow" aria-hidden="true" />
              <div className="home-hero-orbit-line" aria-hidden="true" />
              <img
                src="/t-logo.png"
                alt=""
                className="home-hero-orbit-logo"
              />
              <div className="home-hero-orbits" aria-hidden="true">
                {heroServiceOrbits.map(({ duration, services }, orbitIndex) => (
                  <div
                    className={`home-hero-orbit home-hero-orbit-${orbitIndex + 1}`}
                    key={services[0].title}
                    style={{ '--orbit-duration': duration }}
                  >
                    <div className="home-hero-orbit-rotator">
                      {services.map(({ title, detail, icon: ServiceIcon, color }, serviceIndex) => (
                        <div
                          className={`home-hero-orbit-anchor home-hero-orbit-anchor-${serviceIndex + 1}`}
                          key={title}
                        >
                          <div className="home-hero-orbit-counter">
                            <div className={`home-hero-service-badge home-hero-service-${color}`}>
                              <span className="home-hero-service-icon">
                                <ServiceIcon className="h-4 w-4" />
                              </span>
                              <span className="home-hero-service-copy">
                                <span className="home-hero-service-title">{title}</span>
                                <span className="home-hero-service-detail">{detail}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================= STATS SECTION ================= */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className={`pt-4 sm:pt-0 ${i !== 0 ? 'sm:pl-6' : ''} text-center sm:text-left`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-900">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TRUSTED PARTNERS / ECOSYSTEM ================= */}
        <div className="mt-14 pt-8 pb-4 text-center">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-8">
            Built with Enterprise-Grade Platforms & Leading Technologies
          </p>
          <div
            className="partner-marquee"
            role="region"
            aria-label="Technology platforms and tools"
          >
            <div className="partner-marquee-track">
              <div className="partner-marquee-group">
                {partners.map(renderPartner)}
              </div>
              <div className="partner-marquee-group" aria-hidden="true">
                {partners.map(renderPartner)}
              </div>
            </div>
          </div>
        </div>

        <CoreEngineeringStack />

        {/* ================= QUICK HIGHLIGHTS TEASER ================= */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div
            onClick={() => setActivePage('services')}
            className="group bg-gradient-to-br from-white to-blue-50/50 p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-5">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              End-to-End Engineering
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Full-cycle architecture, full stack web apps, iOS/Android mobile apps, and enterprise DevOps.
            </p>
            <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1">
              Explore Services <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div
            onClick={() => setActivePage('products')}
            className="group bg-gradient-to-br from-white to-cyan-50/50 p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-100/80 text-cyan-600 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
              Intelligent SaaS Tools
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Proprietary SaaS products like MailPilot, LeadFlow CRM, and AI Agent Hub built for real team growth.
            </p>
            <span className="text-xs font-bold text-cyan-600 inline-flex items-center gap-1">
              View SaaS Products <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div
            onClick={() => setActivePage('about')}
            className="group bg-gradient-to-br from-white to-indigo-50/50 p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              Long-Term Partnership
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              We act as an extension of your product team with transparent workflows, continuous support and innovation.
            </p>
            <span className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1">
              About Tattva Tech <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

        </div>

        {/* ================= CALLOUT BANNER ================= */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
              Ready to create real impact?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have an Ambitious Project in Mind? Let's Build It Together.
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Get in touch with our engineering and product leaders for a free strategy session.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('contact')}
                className="px-6 py-3 rounded-full bg-white text-blue-700 font-bold text-sm shadow hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
      <BrandMarquee />
    </div>
  );
}
