import { useState, Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const introLine1 = "Hello, My name is";
const introLine2 = "Also known as";
const nameLine1 = "Leonid Mehandzhijski";
const nameLine2 = "CicadaKatz";

// (Animation timing constants remain the same)
const cssAnimationDurationSeconds = 1.2;
const animationDurationMs = cssAnimationDurationSeconds * 1000;
const letterAnimationDelayMs = 40;
const estimatedMaxLetters = 25;
const maxStaggerDelayMs = (estimatedMaxLetters > 0 ? estimatedMaxLetters - 1 : 0) * letterAnimationDelayMs;
const totalVisualAnimationTimeMs = maxStaggerDelayMs + animationDurationMs;
const animationCycleLockoutMs = Math.ceil(totalVisualAnimationTimeMs / 100) * 100 + 400;

// (Animation variants remain the same)
const heroContainerVariants = {
  hidden: { opacity: 1 }, 
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface TextItem {
  id: string;
  content: string;
  isActive: boolean;
  animationClass: string;
}

function HeroSection() {
  const [introTexts, setIntroTexts] = useState<TextItem[]>([
    { id: 'intro1', content: introLine1, isActive: true, animationClass: '' },
    { id: 'intro2', content: introLine2, isActive: false, animationClass: '' },
  ]);
  const [nameTexts, setNameTexts] = useState<TextItem[]>([
    { id: 'name1', content: nameLine1, isActive: true, animationClass: '' },
    { id: 'name2', content: nameLine2, isActive: false, animationClass: '' },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to track window size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateTextAnimation = (currentSet: TextItem[], setFunction: Dispatch<SetStateAction<TextItem[]>>) => {
    const activeIndex = currentSet.findIndex(t => t.isActive);
    const nextIndex = (activeIndex + 1) % currentSet.length;

    setFunction(prevTexts =>
      prevTexts.map((text, index) => {
        if (index === activeIndex) return { ...text, animationClass: 'wave-out' };
        if (index === nextIndex) return { ...text, isActive: true, animationClass: 'wave-in' };
        return text;
      })
    );

    setTimeout(() => {
      setFunction(prevTexts =>
        prevTexts.map((text, index) => {
          if (index === activeIndex) return { ...text, isActive: false, animationClass: '' };
          if (index === nextIndex) return { ...text, animationClass: '' };
          return text;
        })
      );
    }, animationCycleLockoutMs);
  };

  // Memoize the animation handler to prevent re-creating it on every render
  const handleAnimationTrigger = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    updateTextAnimation(introTexts, setIntroTexts);
    updateTextAnimation(nameTexts, setNameTexts);

    setTimeout(() => {
      setIsAnimating(false);
    }, animationCycleLockoutMs);
  }, [isAnimating, introTexts, nameTexts]);

  // Effect to set up the animation interval based on screen size
  useEffect(() => {
    let animationInterval: NodeJS.Timeout | null = null;

    // 768px is the default 'md' breakpoint in Tailwind CSS
    if (windowWidth < 768) {
      animationInterval = setInterval(handleAnimationTrigger, 5000);
    }

    // Clean up the interval when the component unmounts or width changes
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [windowWidth, handleAnimationTrigger]);

  return (
    <motion.section
      id="home" 
      className="section min-h-screen flex items-center"
      aria-label="Hero section"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          variants={heroItemVariants}
        >
          <div 
            className="flex flex-col items-center" 
            onMouseEnter={handleAnimationTrigger} // Still triggers on hover for desktop
            style={{ cursor: 'pointer' }}
          >
            {/* ... (rest of the JSX for text rendering is the same) */}
            <div className="text-container">
              {introTexts.map(textItem => (
                <div
                  key={textItem.id}
                  className={`text-span ${textItem.isActive ? 'active' : ''} ${textItem.animationClass}`}
                >
                  {textItem.content.split('').map((char, i) => (
                    <span
                      key={i}
                      className="letter"
                      style={{ animationDelay: `${i * letterAnimationDelayMs}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="text-container mt-1 md:mt-2">
              {nameTexts.map(textItem => (
                <div
                  key={textItem.id}
                  className={`text-span ${textItem.isActive ? 'active' : ''} ${textItem.animationClass}`}
                >
                  {textItem.content.split('').map((char, i) => (
                    <span
                      key={i}
                      className="letter text-primary"
                      style={{ animationDelay: `${i * letterAnimationDelayMs}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-gray-300 mb-8"
          variants={heroItemVariants}
        >
          Full Stack Developer
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={heroItemVariants}
        >
          <a href="#projects" className="btn btn-primary clickable">
            View My Work
          </a>
          <a href="#contact" className="btn border border-primary text-primary hover:bg-primary/10 clickable">
            Contact Me
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
