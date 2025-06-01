import { motion } from 'framer-motion';

// Animation Variants (can be shared if they are generic enough)
const itemFadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Footer() {
  const privacyPolicyUrl = "https://unsubly-privacy-policy.cicadakatz.space/"; // Your privacy policy URL

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
        <p className="mt-2"> {/* Added margin-top for spacing */}
          <a
            href={privacyPolicyUrl}
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            className="hover:underline text-primary dark:text-sky-400" // Added some basic styling, adjust as needed
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
