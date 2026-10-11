// Dhanus App - Updated 2026-10-11 00:40
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Components/Loader";
import ScrollProgress from "./Components/ScrollProgress";
import Navbar from "./Components/navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
// import Ecommerce from "./Components/Ecommerce";
import Education from "./Components/Education";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import ResumeModal from "./Components/ResumeModal";
import ContactModal from "./Components/ContactModal";
import StoreRoutes from "./ecommerce/routes/StoreRoutes";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Avoid flash of scrollbar during initial load
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  // Show contact modal after 3 seconds of loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsContactModalOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-300">
      {/* Background Static Grid & Radial Light Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none -z-10" />

      {/* Luxury Animated SVG Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Router View Configuration */}
      {!isLoading && (
        <Routes>
          {/* Main Portfolio Home Page */}
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col min-h-screen relative"
              >
                <ScrollProgress />
                <Navbar onOpenResume={() => setIsResumeOpen(true)} />

                <main className="flex-grow">
                  <Hero onOpenResume={() => setIsResumeOpen(true)} />
                  <About />
                  <Skills />
                  <Experience />
                  <Projects />
                  {/* <Ecommerce /> */}
                  <Education />
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
              </motion.div>
            }
          />

          {/* Dedicated E-Commerce Platform Routes */}
          <Route path="/store/*" element={<StoreRoutes />} />
          <Route path="/store" element={<StoreRoutes />} />
          <Route path="/ecommerce/*" element={<StoreRoutes />} />
          <Route path="/ecommerce" element={<StoreRoutes />} />
          <Route path="/product/*" element={<StoreRoutes />} />
          <Route path="/product" element={<StoreRoutes />} />
          <Route path="/products/*" element={<StoreRoutes />} />
          <Route path="/products" element={<StoreRoutes />} />
        </Routes>
      )}
    </div>
  );
}