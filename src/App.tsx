import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const projects = [
  {
    title: 'Unsubly',
    description: 'A Chrome extension that helps users manage and unsubscribe from email subscriptions in their Gmail inbox.',
    imageUrl: 'https://placehold.co/600x400/1e293b/0ea5e9?text=Unsubly',
    technologies: ['Chrome Extension', 'JavaScript', 'Gmail API'],
    demoUrl: 'https://cicadakatz.github.io/home-page/',
    privacyUrl: 'https://cicadakatz.github.io/unsubly-privacy/',
  },
  {
    title: 'Future Project X',
    description: 'An exciting project coming soon...',
    imageUrl: 'https://placehold.co/600x400/1e293b/0ea5e9?text=Coming+Soon',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    demoUrl: '#',
  },
];

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 88 },
  { name: 'Node.js', level: 82 },
  { name: 'HTML/CSS', level: 95 },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <header className="fixed w-full bg-dark/90 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-primary">Cicada Katz</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize hover:text-primary transition-colors ${
                  activeSection === section ? 'text-primary' : ''
                }`}
              >
                {section}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`block capitalize hover:text-primary transition-colors ${
                  activeSection === section ? 'text-primary' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {section}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="section min-h-screen flex items-center">
      <div className="container text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Hi, I'm <span className="text-primary">Cicada Katz</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Full Stack Developer & Chrome Extension Creator
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn border border-primary text-primary hover:bg-primary/10">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto text-gray-300">
          <p className="mb-4">
            I'm a passionate developer focused on creating useful tools and applications.
            My journey in programming started with a curiosity about how things work,
            which led me to explore various technologies and frameworks.
          </p>
          <p className="mb-4">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or learning new skills.
          </p>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View Demo
          </a>
          {project.privacyUrl && (
            <a
              href={project.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-primary text-primary hover:bg-primary/10"
            >
              Privacy Policy
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-300 mb-8">
            Feel free to reach out to me for any questions or opportunities!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/CicadaKatz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Mail size={24} />
            </a>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary py-8">
      <div className="container text-center text-gray-300">
        <p>&copy; {new Date().getFullYear()} Cicada Katz. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App; 