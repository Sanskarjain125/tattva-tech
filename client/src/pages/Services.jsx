import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  Cpu,
  Palette,
  Box,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Code2,
  Server,
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

export default function Services({ setActivePage }) {
  const [selectedService, setSelectedService] = useState(null);

  const servicesList = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description:
        'High-performance websites and web applications tailored to your business goals.',
      icon: Globe,
      accentColor: 'blue',
      tag: 'Web & Cloud',
      fullDescription:
        'From high-speed web portals to complex enterprise platforms, we craft responsive, accessible, and ultra-fast web experiences using React, Next.js, Node.js, and modern cloud infrastructures.',
      deliverables: [
        'Single Page Applications (SPAs) & Server-Side Rendering (SSR)',
        'Custom RESTful & GraphQL API Architecture',
        'Headless CMS & E-Commerce Integration',
        '99.99% Uptime Cloud Hosting Setup',
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'AWS / Vercel'],
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Feature-rich Android & iOS apps with modern UI/UX.',
      icon: Smartphone,
      accentColor: 'cyan',
      tag: 'iOS & Android',
      fullDescription:
        'We engineer intuitive, high-performance native and cross-platform mobile apps designed to delight users and drive retention on both the Apple App Store and Google Play Store.',
      deliverables: [
        'Cross-platform React Native & Flutter Apps',
        'Native iOS (Swift) & Android (Kotlin) Optimization',
        'Offline-First Data Sync & Push Notifications',
        'Biometric Auth, Secure Wallets & In-App Purchases',
      ],
      techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      description:
        'AI chatbots, workflow automation and custom AI solutions.',
      icon: Cpu,
      accentColor: 'purple',
      tag: 'Intelligent Systems',
      fullDescription:
        'Transform your workflows and unlock high-velocity decision-making. We build production-ready AI agents, specialized RAG knowledge engines, and autonomous workflow bots.',
      deliverables: [
        'Custom RAG (Retrieval-Augmented Generation) Systems',
        'Autonomous Multi-Agent Task Orchestration',
        'Intelligent Customer Support Chatbots',
        'Document Parsing & Workflow Automation',
      ],
      techStack: ['OpenAI', 'LangChain', 'LlamaIndex', 'Python', 'Vector DBs (Pinecone/Milvus)', 'FastAPI'],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Beautiful and user-centric designs that drive engagement.',
      icon: Palette,
      accentColor: 'violet',
      tag: 'Design Systems',
      fullDescription:
        'We design digital experiences that feel effortless, memorable, and visually stunning. From wireframes to atomic design systems, every pixel is purposeful.',
      deliverables: [
        'User Journey Mapping & Information Architecture',
        'High-Fidelity Interactive Prototypes in Figma',
        'Comprehensive Component Design Systems',
        'WCAG AA/AAA Accessibility & Usability Testing',
      ],
      techStack: ['Figma', 'FigJam', 'Principle', 'Design Tokens', 'Tailwind Design System'],
    },
    {
      id: 'saas-dev',
      title: 'SaaS Development',
      description:
        'End-to-end SaaS product development from idea to scale.',
      icon: Box,
      accentColor: 'emerald',
      tag: 'Multi-Tenant Cloud',
      fullDescription:
        'Take your SaaS from napkin sketch to market-ready product in weeks. We architect multi-tenant SaaS backends with robust billing, role-based access, and automated scaling.',
      deliverables: [
        'Multi-Tenant Architecture & Data Isolation',
        'Stripe / LemonSqueezy Subscription Billing',
        'Role-Based Access Control (RBAC) & Single Sign-On (SSO)',
        'Automated CI/CD Pipelines & Observability',
      ],
      techStack: ['Node.js', 'Express', 'MongoDB / PostgreSQL', 'Docker', 'Kubernetes', 'Stripe'],
    },
    {
      id: 'digital-growth',
      title: 'Digital Growth',
      description:
        'SEO, content, ads and growth strategies for measurable results.',
      icon: TrendingUp,
      accentColor: 'amber',
      tag: 'Growth & CRO',
      fullDescription:
        'Building a great product is only half the journey. We implement high-impact organic search strategies, conversion rate optimization, and behavioral tracking to scale your revenue.',
      deliverables: [
        'Technical SEO & Core Web Vitals Optimization',
        'Conversion Rate Optimization (CRO) & A/B Testing',
        'Product Analytics & Cohort Retention Tracking',
        'High-Converting Landing Pages & Lead Funnels',
      ],
      techStack: ['Google Analytics 4', 'Mixpanel', 'PostHog', 'A/B Testing Suites', 'SEMrush'],
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-slate-200/80">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Services
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              End-to-End Technology Solutions for Modern Businesses
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We combine design, development and intelligent technology to build solutions that create real business impact.
            </p>
          </div>

          {/* Right Action & Playful Sketch Tag */}
          <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
            <span className="text-xs font-serif italic text-blue-500 font-medium tracking-wide">
              ~ From idea to impact ~
            </span>
            <button
              onClick={() => setActivePage('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 6 SERVICES GRID ================= */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              accentColor={service.accentColor}
              tag={service.tag}
              onLearnMore={() => setSelectedService(service)}
            />
          ))}
        </div>

        {/* ================= METHODOLOGY BANNER ================= */}
        <div className="mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Process
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How We Turn Ideas Into Impact
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              A transparent, agile workflow refined across 50+ successful product deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-black text-blue-600 font-mono">01</span>
              <h4 className="text-base font-bold text-slate-900">Discovery & Strategy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep dive into your business logic, user personas, technical hurdles, and market differentiation.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-black text-cyan-600 font-mono">02</span>
              <h4 className="text-base font-bold text-slate-900">Architecture & Design</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clickable wireframes, interactive user flows, and scalable cloud database schemas.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-black text-purple-600 font-mono">03</span>
              <h4 className="text-base font-bold text-slate-900">Agile Engineering</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sprint-based coding with weekly live preview links, automated test suites, and strict QA.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-black text-emerald-600 font-mono">04</span>
              <h4 className="text-base font-bold text-slate-900">Launch & Evolution</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero-downtime deployment, continuous performance monitoring, and iterative feature scaling.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ================= SERVICE DETAILS MODAL ================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <selectedService.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {selectedService.tag}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Key Deliverables & Capabilities
              </h4>
              <div className="space-y-2">
                {selectedService.deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setActivePage('contact');
                }}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
