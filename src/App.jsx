import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Components/Loader";
import ScrollProgress from "./Components/ScrollProgress";
import Navbar from "./Components/navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import ServicesSection from "./Components/ServicesSection";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import CaseStudiesSection from "./Components/CaseStudiesSection";
import ProcessSection from "./Components/ProcessSection";
import WhyHireMeSection from "./Components/WhyHireMeSection";
import Education from "./Components/Education";
import FAQSection from "./Components/FAQSection";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import ResumeModal from "./Components/ResumeModal";
import ContactModal from "./Components/ContactModal";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";
import ServiceDetail from "./Components/ServiceDetail";
import NotFound from "./Components/NotFound";
import SEO from "./Components/SEO";
import StoreRoutes from "./ecommerce/routes/StoreRoutes";
import { homepageFaqs } from "./data/faqData";
import { personalInfo } from "./data/portfolioData";

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // If user lands directly on a service page, skip the 2.6s hero loader
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return false;
    }
    return true;
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Manage body scroll during initial loader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  // Show contact modal after 5 seconds of loading on homepage
  useEffect(() => {
    if (!isLoading && window.location.pathname === "/") {
      const timer = setTimeout(() => {
        setIsContactModalOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Structured Data for Homepage (Person + WebSite + FAQPage)
  const homepageStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://shri-laxman-frontend.vercel.app/#person",
      name: personalInfo.name,
      givenName: "Piyush",
      familyName: "Vishwakarma",
      jobTitle: "Freelance MERN Stack & Full Stack Developer",
      description:
        "Freelance Full Stack MERN Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, REST APIs and custom web applications.",
      url: "https://shri-laxman-frontend.vercel.app/",
      image: "https://shri-laxman-frontend.vercel.app/Lax.png",
      email: `mailto:${personalInfo.email}`,
      telephone: "+919794125123",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Dr. APJ Abdul Kalam Technical University",
      },
      sameAs: [
        "https://www.linkedin.com/in/piyush-vishwakarma-93b971259/",
        "https://github.com/Piyush9794",
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TypeScript",
        "JavaScript",
        "RESTful API Development",
        "MERN Stack",
        "Tailwind CSS",
        "Full Stack Development",
        "Web Application Architecture",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://shri-laxman-frontend.vercel.app/#website",
      url: "https://shri-laxman-frontend.vercel.app/",
      name: "Piyush Vishwakarma | Freelance MERN Stack & Full Stack Developer",
      description:
        "Hire Piyush Vishwakarma, Freelance Full Stack MERN Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, REST APIs and custom web applications. Available for freelance projects and remote opportunities.",
      publisher: {
        "@id": "https://shri-laxman-frontend.vercel.app/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-300">
      {/* Background Static Grid & Radial Light Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none -z-10" />

      {/* Luxury Animated SVG Loader (Overlay on top of DOM) */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Router View Configuration */}
      <Routes>
        {/* Main Portfolio Home Page */}
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col min-h-screen relative"
            >
              <SEO
                title="Piyush Vishwakarma | Freelance MERN Stack & Full Stack Developer"
                description="Hire Piyush Vishwakarma, Freelance Full Stack MERN Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, REST APIs and custom web applications. Available for freelance projects and remote opportunities."
                keywords="Hire Freelance Web Developer, Freelance MERN Stack Developer, Hire React.js Developer, Hire Full Stack Developer, Freelance Website Developer, Node.js Backend Developer, React.js Development Services, Custom Website Development, Business Website Development, REST API Development, Next.js Developer, Web Application Development, Website Developer in Lucknow, Freelance Web Developer in India, Remote Full Stack Developer"
                canonical="/"
                structuredData={homepageStructuredData}
              />

              <ScrollProgress />
              <Navbar onOpenResume={() => setIsResumeOpen(true)} />

              <main className="flex-grow">
                <Hero onOpenResume={() => setIsResumeOpen(true)} />
                <About />
                <ServicesSection />
                <Skills />
                <Projects />
                <CaseStudiesSection />
                <ProcessSection />
                <WhyHireMeSection />
                <Experience />
                <Education />
                <FAQSection />
                <Contact />
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

              <FloatingWhatsApp />
            </motion.div>
          }
        />

        {/* Dedicated SEO Service Pages */}
        <Route
          path="/freelance-web-development"
          element={<ServiceDetail slug="freelance-web-development" />}
        />
        <Route
          path="/mern-stack-development"
          element={<ServiceDetail slug="mern-stack-development" />}
        />
        <Route
          path="/react-js-development"
          element={<ServiceDetail slug="react-js-development" />}
        />
        <Route
          path="/node-js-backend-development"
          element={<ServiceDetail slug="node-js-backend-development" />}
        />
        <Route
          path="/next-js-development"
          element={<ServiceDetail slug="next-js-development" />}
        />
        <Route
          path="/website-development-lucknow"
          element={<ServiceDetail slug="website-development-lucknow" />}
        />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        {/* Dedicated E-Commerce Platform Routes */}
        <Route path="/store/*" element={<StoreRoutes />} />
        <Route path="/store" element={<StoreRoutes />} />
        <Route path="/ecommerce/*" element={<StoreRoutes />} />
        <Route path="/ecommerce" element={<StoreRoutes />} />
        <Route path="/product/*" element={<StoreRoutes />} />
        <Route path="/product" element={<StoreRoutes />} />
        <Route path="/products/*" element={<StoreRoutes />} />
        <Route path="/products" element={<StoreRoutes />} />

        {/* 404 Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
