import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="section py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900 dark:text-white">My Skills</h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill) => (
            <motion.div 
              key={skill.name} 
              className="p-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex justify-center items-center text-center aspect-square 
                         bg-white/50 dark:bg-slate-900/50 
                         backdrop-blur-md 
                         border border-white/50 dark:border-slate-700/60"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
            >
              <span className="text-slate-800 dark:text-gray-100 font-medium text-sm md:text-base">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection; 