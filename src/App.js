import React from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Sidebar from './components/sidebar/Sidebar';
import ThemeToggle from './components/common/ThemeToggle';
import ChatWidget from './components/chat/ChatWidget';
import Home from './components/home/Home';
import About from './components/about/About';
import Resume from './components/resume/Resume';
import Services from './components/services/Services';
import Portfolio from './components/portfolio/Portfolio';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import AllProjects from './components/allProjects/AllProjects';
import Blog from './components/blog/Blog';
import Post from './components/blog/Post';
import BlogPreview from './components/blog/BlogPreview';

const ScrollToAnchor = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

const MainContent = () => (
  <>
    <ScrollToAnchor />
    <Home />
    <About />
    <Resume />
    <Portfolio />
    <Services />
    <Testimonials />
    <BlogPreview />
    <Contact />
  </>
);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><MainContent /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><AllProjects /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><Post /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <Sidebar />
      <ThemeToggle />
      <main className='main'>
        <AnimatedRoutes />
      </main>
      <ChatWidget />
    </MotionConfig>
  );
}

export default App;
