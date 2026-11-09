import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  MessageCircle,
  Mail,
  Globe,
  Layers,
  Code,
  Server,
  Zap,
  MapPin,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import { projectsData, personalInfo } from "../data/portfolioData";
import Navbar from "./navbar";
import Footer from "./Footer";
import ResumeModal from "./ResumeModal";
import ContactModal from "./ContactModal";
import SEO from "./SEO";
import ScrollProgress from "./ScrollProgress";
import NotFound from "./NotFound";

const serviceIcons = {
  "freelance-web-development": Globe,
  "mern-stack-development": Layers,
  "react-js-development": Code,
  "node-js-backend-development": Server,
  "next-js-development": Zap,
  "website-development-lucknow": MapPin,
};

export default function ServiceDetail({ slug: propSlug }) {
  const params = useParams();
  const currentSlug = propSlug || params.slug;

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentSlug]);

  const service = servicesData.find((s) => s.slug === currentSlug);

  if (!service) {
    return <NotFound />;
  }

  const Icon = serviceIcons[service.slug] || Code;

  // Filter real projects relevant to this service
  const relevantProjects = projectsData.filter((p) =>
    service.relevantProjectIds.includes(p.id)
  );

  // Other services for internal linking
  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  // JSON-LD Schemas: Service Schema + FAQPage Schema
  const serviceStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.seoDescription,
      provider: {
        "@type": "Person",
        name: personalInfo.name,
        url: "https://shri-laxman-frontend.vercel.app/",
        jobTitle: "Freelance MERN Stack & Full Stack Developer",
        telephone: "+919794125123",
        email: personalInfo.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Lucknow" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      serviceType: service.shortTitle,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/#services" },
    { name: service.shortTitle, item: `/${service.slug}` },
  ];

  const whatsappMessage = encodeURIComponent(
    `Hi Piyush, I am interested in your ${service.title} and would like to discuss my project requirements.`
  );

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-300 flex flex-col">
      <SEO
        title={service.seoTitle}
        description={service.seoDescription}
        keywords={service.keywords}
        canonical={`/${service.slug}`}
        breadcrumbs={breadcrumbs}
        structuredData={serviceStructuredData}
      />

      {/* Background static grid & radial glows */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none -z-10" />

      <ScrollProgress />
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400 mb-8"
          >
            <Link
              to="/"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <a
              href="/#services"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Services
            </a>
            <span>/</span>
            <span className="text-cyan-700 dark:text-cyan-300 font-medium">
              {service.shortTitle}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-4">
              <Icon className="w-4 h-4" />
              <span>{service.badge}</span>
            </div>

            {/* Main Service H1 */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              {service.h1}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-3xl">
              {service.heroSubtitle}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/919794125123?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Get a Project Estimate</span>
              </button>
            </div>
          </div>

          {/* Problems & Solutions Grid */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                Solving Real Client Challenges
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
                Common Problems I Solve for Clients
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.clientProblems.map((cp, idx) => (
                <div
                  key={idx}
                  className="glow-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between"
                >
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/5 border border-red-500/15">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 mb-2 font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-zinc-300">
                      {cp.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>My Solution</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-zinc-300">
                      {cp.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Used */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                Engineering Stack
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
                Technologies & Architectures Utilized
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.technologies.map((techGroup, tIdx) => (
                <div
                  key={tIdx}
                  className="glow-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/[0.08]"
                >
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-white/[0.06]">
                    {techGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techGroup.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Development Process */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                How We Deliver
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
                Step-by-Step Development Process
              </h2>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="glow-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/[0.08] flex items-start gap-4 sm:gap-6"
                >
                  <span className="font-display font-black text-2xl sm:text-3xl text-cyan-600/50 dark:text-cyan-400/40 flex-shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Relevant Real Portfolio Projects */}
          {relevantProjects.length > 0 && (
            <section className="mb-20">
              <div className="text-center mb-10">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                  Real Production Proof
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
                  Featured Projects Built with this Stack
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relevantProjects.map((project) => (
                  <div
                    key={project.id}
                    className="glow-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400">
                          {project.category}
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
                          >
                            <span>Live App</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Service Specific FAQs */}
          <section className="mb-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                Frequently Asked Questions
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
                Questions About {service.shortTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className={`glow-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-cyan-500/50 bg-slate-50/90 dark:bg-zinc-900/80 shadow-md"
                        : "border-slate-200/80 dark:border-white/[0.08]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : fIdx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                    >
                      <span className="font-display font-semibold text-base sm:text-lg text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-cyan-500" : "text-slate-400"
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-200/60 dark:border-white/[0.04]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Internal Cross-Linking to Other Services */}
          <section className="mb-20 pt-10 border-t border-slate-200 dark:border-white/[0.06]">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                Explore More Solutions
              </span>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-1">
                Other Development Services by Piyush
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  to={`/${other.slug}`}
                  className="p-5 rounded-2xl glow-card border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {other.title}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-zinc-400">
                      {other.shortTitle}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          {/* Final Call to Action Box */}
          <div className="p-8 sm:p-12 rounded-3xl glow-card border border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-indigo-500/10 text-center max-w-4xl mx-auto">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white mb-4">
              Ready to Kick Off Your {service.shortTitle} Project?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8">
              Let&apos;s build an exceptional, high-converting digital product. Contact me directly for a confidential discovery call, tech consultation, or milestone proposal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/919794125123?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}?subject=Project%20Inquiry:%20${encodeURIComponent(
                  service.title
                )}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
