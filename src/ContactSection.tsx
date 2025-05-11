import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation Variants (can be shared if they are generic enough)
const sectionContainerVariants = {
  hidden: { opacity: 1 }, 
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemFadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="section"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white"
          variants={itemFadeInUpVariants}
        >
          Contact Me
        </motion.h2>
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={itemFadeInUpVariants}
        >
          <motion.p
            className="text-slate-700 dark:text-gray-300 mb-8"
            variants={itemFadeInUpVariants}
          >
            Feel free to reach out to me for any questions or opportunities!
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            variants={sectionContainerVariants}
          >
            <motion.a
              href="https://github.com/LeonidMehandzhijski"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors clickable"
              aria-label="GitHub profile"
              variants={itemFadeInUpVariants}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="mailto:customer.support@cicadakatz.space"
              className="text-slate-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors clickable"
              aria-label="Send email to customer.support@cicadakatz.space"
              variants={itemFadeInUpVariants}
            >
              <Mail size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/leonid-mehandzijski/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors clickable"
              aria-label="LinkedIn profile"
              variants={itemFadeInUpVariants}
            >
              <Linkedin size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ContactSection; 