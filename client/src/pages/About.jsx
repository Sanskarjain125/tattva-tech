import React from 'react';
import {
  Target,
  MessageSquare,
  Users,
  Headphones,
  CheckCircle,
  ArrowRight,
  Shield,
  Lightbulb,
  Award,
  Sparkles,
  Palette,
  Bot,
  Rocket,
  Layers,
  BookOpen,
  UsersRound,
  KeyRound,
  MonitorSmartphone,
  Eye,
} from 'lucide-react';
import './About.css';

export default function About({ setActivePage }) {
  const stats = [
    { value: '50+', label: 'Projects' },
    { value: '30+', label: 'Clients' },
    { value: '5+', label: 'Products' },
    { value: '3+', label: 'Offices' },
  ];

  const pillars = [
    {
      title: 'Product-Focused Approach',
      desc: 'We treat every line of code as an investment in your product’s long-term business viability and user adoption.',
      icon: Target,
      color: 'blue',
    },
    {
      title: 'Transparent Communication',
      desc: 'Clear roadmaps, honest sprint retrospectives, direct Slack/Teams channels, and no hidden surprises.',
      icon: MessageSquare,
      color: 'cyan',
    },
    {
      title: 'Skilled & Dedicated Team',
      desc: 'Top 3% specialized full-stack engineers, AI researchers, and UX architects dedicated to your mission.',
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Long-Term Support',
      desc: 'We don’t just deliver and vanish; we proactively maintain, optimize performance, and scale with you.',
      icon: Headphones,
      color: 'emerald',
    },
  ];

  const teamMembers = [
    {
      name: 'Sanskar Jain',
      role: 'Founder',
      initials: 'SJ',
      gradient: 'from-blue-600 via-indigo-600 to-blue-700',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      focus: 'Vision, Product Strategy & AI Architecture',
    },
    {
      name: 'Dev Agarwal',
      role: 'Co Founder',
      initials: 'DA',
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      focus: 'Business Operations, Growth & Client Partnerships',
    },
  ];

  const workLifeBenefits = [
    { title: 'Learning & Development', icon: BookOpen, color: 'pink' },
    { title: 'Inclusive & Open Culture', icon: UsersRound, color: 'teal' },
    { title: 'Global Opportunities', icon: KeyRound, color: 'rose' },
    { title: 'Latest Technology', icon: MonitorSmartphone, color: 'indigo' },
  ];

  return (
    <div className="about-page pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION (Screen 5) ================= */}
        <div className="max-w-3xl space-y-4 text-left mb-10">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            About Tattva Tech
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Technology, AI, Robotics & Digital Solutions{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Built for Real-World Impact
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tattva Tech is a technology and innovation company providing software, AI, robotics, digital, creative, and business solutions for startups, businesses, educational institutions, and organizations. We help our clients turn ideas into practical, scalable, and cost-effective solutions that create real business value.
          </p>
        </div>

        {/* ================= STATS ROW ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-200/80 mb-12">
          {stats.map((item, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-slate-700 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">One ecosystem for technology, creativity, and growth</h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our expertise covers custom software, web and mobile app development, AI and machine learning, AI agents, automation, IoT, robotics, UI/UX and graphic design, video editing, branding, digital marketing, SEO, AEO, GEO, content creation, and digital product development. We bring technology, creativity, and business understanding together to help organizations launch, grow, automate, and compete in the digital world.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-7 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">Robotics & Intelligent Automation</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              We design custom robotic systems around each project’s requirements, use cases, and budget—from robot design and architecture to prototypes, AI-powered and autonomous systems, educational and service robots, sensor integration, embedded systems, computer vision, and automation.
            </p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Our goal is to make practical, reliable, cost-effective robotics accessible to startups, schools, colleges, research institutions, and small businesses—not only large organizations.
            </p>
          </article>

          <article className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-7 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center mb-5">
              <Palette className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">Digital & Creative Solutions</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Our digital and creative team builds strong online presences through UI/UX and website design, graphic design, video editing, social media content, branding, SEO, AEO, GEO, digital marketing, and content creation.
            </p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              From a distinct brand identity to a complete digital platform, clients can work with one connected technology and creative team.
            </p>
          </article>

          <article className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-7 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-5">
              <Rocket className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">From Idea to Deployment</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Whether you need a website, mobile app, AI solution, automation system, custom robot, SaaS product, brand identity, or digital marketing, our team can support the complete journey: strategy and design, development, testing, deployment, marketing, and ongoing improvements.
            </p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              We collaborate with international startups, businesses, agencies, and technology companies through project-based and white-label development, dedicated teams, outsourcing, and long-term technology partnerships.
            </p>
          </article>
        </div>

        {/* ================= 4 CORE PILLARS (Screen 5) ================= */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-4">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-20" aria-labelledby="work-life-heading">
          <div className="mb-9 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Our Culture
            </span>
            <h2
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900"
              id="work-life-heading"
            >
              Work Life At Its Best
            </h2>
          </div>
          <div className="work-life-benefits">
            {workLifeBenefits.map(({ title, icon: BenefitIcon, color }) => (
              <article
                className={`work-life-card work-life-card-${color}`}
                key={title}
              >
                <BenefitIcon aria-hidden="true" className="work-life-card-icon" strokeWidth={1.7} />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="about-mission-vision mt-20" aria-label="Our mission and corporate vision">
          <article className="mission-vision-card">
            <div className="mission-vision-accent" aria-hidden="true">
              <Target className="h-6 w-6" />
            </div>
            <h2>Our Mission</h2>
            <p>
              To build high-concurrency, zero-trust software systems and autonomous AI pipelines that deliver measurable operational leverage to ambitious organizations worldwide.
            </p>
          </article>
          <article className="mission-vision-card">
            <div className="mission-vision-accent" aria-hidden="true">
              <Eye className="h-6 w-6" />
            </div>
            <h2>Our Corporate Vision</h2>
            <p>
              To become a globally recognized AI-first engineering partner, known for technical craft, execution speed, and verified proof-of-work talent incubation.
            </p>
          </article>
        </section>

        {/* ================= MEET OUR LEADERSHIP SECTION ================= */}
        <div className="mt-24 pt-16 border-t border-slate-200/90 text-left">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Founders & Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              The Leadership Behind Tattva Tech
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
              Visionary leadership driving engineering excellence, enterprise scale, and client success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-500/15 group-hover:scale-105 transition-transform flex-shrink-0`}
                >
                  {member.initials}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <span
                      className={`text-xs font-bold px-3 py-0.5 rounded-full border ${member.badgeColor}`}
                    >
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {member.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
