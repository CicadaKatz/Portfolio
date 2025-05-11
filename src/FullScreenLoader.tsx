import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hourglass } from 'ldrs/react';
import './styles/hourglass-loader.css';

interface FullScreenLoaderProps {
  onLoaded: () => void;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Stay visible for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onLoaded}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-slate-950 text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        >
          <Hourglass size="60" color="#0ea5e9" bgOpacity={0.1} speed={1.5} />
          <motion.p 
            className="mt-6 text-xl font-medium text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenLoader; 