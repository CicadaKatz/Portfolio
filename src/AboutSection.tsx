import { motion } from 'framer-motion';
import { Globe, Code2, Gamepad2, ShieldCheck, User, Lightbulb, Layers, Coffee, MapPin, Github, SearchCode } from 'lucide-react';

const panelData = [
  {
    id: 'about-me',
    icon: User,
    title: 'About Me',
    content: (
      <div className="flex flex-wrap items-baseline">
        I&apos;m a Computer Science student passionate about <Code2 className="h-4 w-4 mx-1 text-primary" /> Web Development, <Code2 className="h-4 w-4 mx-1 text-primary" /> Software Development, <Gamepad2 className="h-4 w-4 mx-1 text-primary" /> Unreal Engine 5, and <ShieldCheck className="h-4 w-4 mx-1 text-primary" /> Cyber Security.
      </div>
    ),
  },
  {
    id: 'current-ventures',
    icon: Lightbulb,
    title: 'Current Ventures',
    content: (
      <>
        Currently, I&apos;m developing two exciting projects: <strong className="text-primary font-semibold">ChronoZen</strong>, an all-in-one Chrome productivity suite with a Pomodoro timer, task manager, and music controls, and <strong className="text-primary font-semibold">Unsubly</strong>, a Chrome extension that helps users manage their email subscriptions.
      </>
    ),
  },
  {
    id: 'tech-toolkit',
    icon: Layers,
    title: 'Tech Toolkit',
    content: (
      <>
        My tech stack includes React, Google APIs, and Google Cloud. I&apos;m particularly interested in Chrome Extensions development. I&apos;m always eager to collaborate and learn new technologies, especially in web development and browser extensions.
      </>
    ),
  },
  {
    id: 'beyond-code',
    icon: Coffee,
    title: 'Beyond the Code & Location',
    content: (
      <div className="flex flex-wrap items-baseline">
        When I&apos;m not coding, you can find me <SearchCode className="h-4 w-4 mx-1 text-primary" /> exploring new technologies, <Github className="h-4 w-4 mx-1 text-primary" /> contributing to open-source projects, or diving into the world of <Gamepad2 className="h-4 w-4 mx-1 text-primary" /> game development with Unreal Engine 5. I&apos;m based in Skopje, Macedonia, <MapPin className="h-4 w-4 mx-1 text-primary" /> and I&apos;m always open to new opportunities and collaborations. <Globe className="h-4 w-4 mx-1 text-primary" /> Open to new opportunities and collaborations.
      </div>
    ),
  },
];

const panelVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function AboutSection() {
  return (
    <section id="about" className="section py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-900 dark:text-white">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {panelData.map((panel, index) => (
            <motion.div
              key={panel.id}
              className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={panelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <panel.icon className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">{panel.title}</h3>
              </div>
              <div className="text-slate-600 dark:text-gray-300 leading-relaxed">
                {panel.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection; 