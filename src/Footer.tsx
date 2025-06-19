import { motion } from 'framer-motion';

// Animation Variants (can be shared if they are generic enough)
const itemFadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Footer() {

  return (
    <motion.footer
      className="py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={itemFadeInUpVariants}
    >
      <div className="container text-center text-slate-600 dark:text-gray-300">
        <p>&copy; {new Date().getFullYear()} Cicada Katz. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;
