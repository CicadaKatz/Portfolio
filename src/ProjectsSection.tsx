import { ImageIcon } from 'lucide-react';
import { Cardio } from 'ldrs/react';
import './styles/cardio-loader.css';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Animation Variants
const sectionContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionItemFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl: string;
  privacyUrl?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const COMING_SOON_IMAGE_URL_IDENTIFIER = 'text=Coming+Soon';

function ProjectCard({ project }: { project: Project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isComingSoonProject = project.imageUrl.includes(COMING_SOON_IMAGE_URL_IDENTIFIER);

  const selfContainedLogos = ['/icons/unsubly-icon.png', '/icons/break-scheduler-logo.png'];

  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-lg overflow-hidden flex flex-col h-full shadow-lg dark:shadow-xl"
      variants={cardContainerVariants}
    >
      <motion.div
        className={`relative w-full h-40 sm:h-48 flex items-center justify-center ${
          isComingSoonProject || selfContainedLogos.includes(project.imageUrl)
            ? ''
            : 'bg-slate-200 dark:bg-slate-700'
        }`}
        variants={cardItemVariants}
      >
        {isComingSoonProject ? (
          <div className="flex flex-col items-center justify-center text-center">
            <Cardio size="80" stroke="4" speed="1.7" color="#0ea5e9" />
            <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-gray-200">Coming Soon...</p>
          </div>
        ) : (
          <>
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Cardio size="50" stroke="3" speed="1.5" color="#0ea5e9" />
              </div>
            )}
            <img
              src={project.imageUrl}
              alt={`Screenshot of ${project.title}`}
              className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageLoaded(false);
                setImageError(true);
              }}
            />
            {imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-secondary">
                <ImageIcon className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-2" />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{project.title}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Image unavailable</span>
              </div>
            )}
          </>
        )}
      </motion.div>
      <motion.div className="p-6 flex flex-col flex-grow" variants={cardItemVariants}>
        <motion.h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white" variants={cardItemVariants}>{project.title}</motion.h3>
        <motion.p className="text-slate-600 dark:text-gray-300 mb-4 flex-grow" variants={cardItemVariants}>{project.description}</motion.p>
        <motion.div className="flex flex-wrap gap-2 mb-4" variants={cardItemVariants}>
          {project.technologies.map((tech) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm"
              variants={cardItemVariants}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className="flex flex-wrap gap-4 mt-auto" variants={cardItemVariants}>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary clickable"
          >
            View Demo
          </a>
          {project.privacyUrl && (
            <a
              href={project.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-primary text-primary hover:bg-primary/10 clickable"
            >
              Privacy Policy
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      className="section"
      aria-labelledby="projects-heading"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <motion.h2
          id="projects-heading"
          className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white"
          variants={sectionItemFadeInUp}
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          role="list"
          variants={sectionContainerVariants}
        >
          {projects.map((project) => (
            <motion.div role="listitem" key={project.title} variants={sectionItemFadeInUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProjectsSection;
