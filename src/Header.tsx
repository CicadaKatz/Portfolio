import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';
import ThemeToggle from './ThemeToggle';

// Animation Variants
const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3, // Delay after initial page load/fade-in
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Effect to handle active section highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <motion.header
      className="fixed w-full bg-white/80 dark:bg-dark/90 backdrop-blur-sm z-50 shadow-md dark:shadow-none"
      role="banner"
      initial="hidden"
      animate="visible"
      variants={navContainerVariants}
    >
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-2xl font-bold text-primary"
            variants={titleVariants}
          >
            Cicada Katz
          </motion.a>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <motion.div
              className="hidden md:flex space-x-6"
            >
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize text-slate-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors ${
                    activeSection === section ? 'text-primary dark:text-primary' : ''
                  }`}
                  variants={navItemVariants}
                >
                  {section}
                </motion.a>
              ))}
            </motion.div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-700 dark:text-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden mt-4 space-y-2 bg-white dark:bg-dark rounded-md shadow-lg p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className={`block capitalize text-slate-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors py-2 px-3 rounded-md ${
                  activeSection === section ? 'text-primary dark:text-primary bg-slate-100 dark:bg-slate-700' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {section}
              </motion.a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

export default Header;
