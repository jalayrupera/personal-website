import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.p 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          /about
        </motion.p>
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Who I Am
        </motion.h2>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about-text">
            <p>
              Results-driven <span className="highlight">Backend Engineer</span> and <span className="highlight">Ex-Founder</span> with 
              <span className="highlight"> 3.5+ years</span> of experience in Python, FastAPI, Celery, Redis, MongoDB, and 
              REST API development.
            </p>
            <p>
              Proven track record building scalable backend systems, automating complex workflows, and optimizing data pipelines. 
              Adept at designing reliable distributed microservices and integrating AI/LLM-powered modules.
            </p>
            <p>
              Passionate about solving high-impact engineering problems with <span className="highlight">startup-style ownership</span>.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat">
              <span className="stat-value">3.5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Concurrent Users</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;