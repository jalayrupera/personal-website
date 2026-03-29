import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    name: "Languages",
    keywords: ["Python", "JavaScript"]
  },
  {
    name: "Backend Frameworks",
    keywords: ["FastAPI"]
  },
  {
    name: "Databases",
    keywords: ["MongoDB", "Redis", "PostgreSQL"]
  },
  {
    name: "Messaging & Async",
    keywords: ["Celery", "RabbitMQ"]
  },
  {
    name: "Infrastructure",
    keywords: ["Docker", "Kubernetes", "K3s", "AWS", "CI/CD Pipelines"]
  },
  {
    name: "Tools & Frameworks",
    keywords: ["Playwright", "Git", "REST APIs", "Linux", "ROS2", "MQTT"]
  },
  {
    name: "Specialized",
    keywords: ["LLM Prompting", "Web Scraping", "System Design", "Microservices"]
  }
];

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.p 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          /skills
        </motion.p>
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tech Stack
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.name}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <h3 className="skill-category-name">{category.name}</h3>
              <div className="skill-tags">
                {category.keywords.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="skills-terminal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="terminal-line">
            <span className="prompt">$</span> cat skills.json | jq '.total'
          </div>
          <div className="terminal-output">
            <span className="output-bracket">"</span>
            <span className="output-number">25</span>
            <span className="output-bracket">"</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;