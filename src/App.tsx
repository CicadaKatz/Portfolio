import React, { Suspense, useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
// import AboutSection from './AboutSection';
// import SkillsSection from './SkillsSection';
// import ProjectsSection from './ProjectsSection';
// import ContactSection from './ContactSection';
import Footer from './Footer';
// import { Loader2 } from 'lucide-react';
import { Cardio } from 'ldrs/react';
// import 'ldrs/react/cardio.css'; // CSS for Cardio is now in FullScreenLoader and App.tsx for SectionSpinner
import AnimatedCursor from 'react-animated-cursor';
import FullScreenLoader from './FullScreenLoader'; // Import the new loader

// Lazy load sections
const AboutSection = React.lazy(() => import('./AboutSection'));
const SkillsSection = React.lazy(() => import('./SkillsSection'));
const ProjectsSection = React.lazy(() => import('./ProjectsSection'));
const ContactSection = React.lazy(() => import('./ContactSection'));

const projects = [
  {
    title: 'Unsubly',
    description: 'A Chrome extension that helps users manage and unsubscribe from email subscriptions in their Gmail inbox.',
    imageUrl: '/icons/unsubly-icon.png',
    technologies: ['Chrome Extension', 'JavaScript', 'Gmail API'],
    demoUrl: 'https://cicadakatz.github.io/home-page/',
    privacyUrl: 'https://cicadakatz.github.io/unsubly-privacy/',
  },
  {
    title: 'Future Project X',
    description: 'An exciting project coming soon...',
    imageUrl: 'https://placehold.co/600x400/1e293b/0ea5e9?text=Coming+Soon',
    technologies: ['???', '???', '???'],
    demoUrl: '#',
  },
];

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 88 },
  { name: 'Node.js', level: 82 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Vite.js', level: 80 },
];

function SectionSpinner() {
  return (
    <div className="section flex justify-center items-center min-h-[calc(100vh-200px)]">
      {/* <Loader2 className="h-16 w-16 text-primary animate-spin" /> */}
      <Cardio size="60" stroke="3" speed="1.5" color="#0ea5e9" />
    </div>
  );
}

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  return (
    <>
      {!isAppLoaded && <FullScreenLoader onLoaded={() => setIsAppLoaded(true)} />}

      {isAppLoaded && (
        <>
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            color='14, 165, 233' // Primary color (RGB for #0ea5e9)
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={2} 
            clickables={[
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.link',
              '.clickable' // Added a generic .clickable class
            ]}
          />
          <Header />
          <main aria-label="Main content">
            <HeroSection />
            <Suspense fallback={<SectionSpinner />}>
              <AboutSection />
              <SkillsSection skills={skills} />
              <ProjectsSection projects={projects} />
              <ContactSection />
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App; 