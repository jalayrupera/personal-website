import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    name: "Insurance Eligibility Chrome Extension",
    entity: "Mantys",
    description: "Production-grade Chrome Extension used by hospitals and clinics in the UAE to check patient insurance eligibility in real time.",
    highlights: [
      "Enabled users to verify coverage using Emirates ID, Member ID, or DHA ID for instant validation.",
      "Integrated with hospital information systems (HIS) to automate insurance form filling and document uploads.",
      "Reduced front-desk workload and paperwork errors by 90%, contributing to over $450K ARR."
    ],
    keywords: ["Chrome Extension", "Healthcare", "Insurance", "UAE", "HIS Integration"]
  },
  {
    name: "Drishti — Autonomous Drone System",
    entity: "Vigilare Technologies",
    description: "GPS-denied navigation system integrating sensor drivers, visual-inertial odometry (VIO), and backend communication.",
    highlights: [
      "Built a GPS-denied navigation system with sensor fusion and visual-inertial odometry.",
      "Implemented data processing pipelines in Python (FastAPI) for mission logs and telemetry.",
      "Deployed using Docker + K3s for modular orchestration."
    ],
    keywords: ["Drones", "GPS-denied Navigation", "VIO", "ROS2", "FastAPI", "Docker", "K3s"]
  },
  {
    name: "Stock Wars — Virtual Trading Platform",
    entity: "Zu Technologies",
    description: "Real-time virtual stock trading simulation platform handling 10K+ concurrent users.",
    highlights: [
      "Designed backend architecture for real-time trading simulation using FastAPI, Celery, and Redis.",
      "Handled asynchronous task processing with RabbitMQ and optimized database operations."
    ],
    keywords: ["Trading Simulation", "Real-time", "FastAPI", "Celery", "Redis", "RabbitMQ"]
  }
];

const Projects = () => {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.p 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          /projects
        </motion.p>
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Featured Work
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="project-header">
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <span className="project-entity">{project.entity}</span>
              </div>
              
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              
              <ul className="project-highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
              
              <div className="project-keywords">
                {project.keywords.map((keyword) => (
                  <span key={keyword} className="keyword">{keyword}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;