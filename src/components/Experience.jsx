import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    name: "Mantys",
    position: "SDE - Core",
    location: "Bangalore, Karnataka",
    startDate: "Apr 2025",
    endDate: "Present",
    summary: "Healthcare technology company building tools for insurance eligibility verification.",
    highlights: [
      "Engineered automated web scraping pipelines using Playwright and Python, reducing manual patient data retrieval time by 80%.",
      "Developed LLM-based data transformation workflows converting unstructured HTML into structured JSON with 95%+ accuracy.",
      "Enhanced the core Chrome extension, adding features and fixing bugs that reduced user-reported issues by 90%.",
      "Collaborated with cross-functional teams to improve backend reliability, observability, and system performance."
    ],
    isCurrent: true,
    yc: true
  },
  {
    name: "Vigilare Technologies",
    position: "Founder & CEO — Backend Engineer",
    location: "Bhavnagar, Gujarat",
    startDate: "Jan 2024",
    endDate: "Feb 2025",
    summary: "Defense-tech startup building GPS-denied autonomous drone systems for mapping and inspection.",
    highlights: [
      "Founded a defense-tech startup building a GPS-denied autonomous drone system for mapping and inspection.",
      "Developed backend services and REST APIs (Python, FastAPI) for real-time data streaming and mission control.",
      "Created ROS2 packages for sensor fusion, Visual-Inertial Odometry (VIO), and telemetry communication via MQTT.",
      "Containerized and deployed backend systems with Docker and K3s, enabling modular and scalable deployment."
    ],
    isCurrent: false
  },
  {
    name: "Zu Technologies",
    position: "Backend Developer — B2B SaaS",
    location: "Bangalore, Karnataka",
    startDate: "May 2022",
    endDate: "Sep 2023",
    summary: "B2B SaaS company building engagement and gamification platforms.",
    highlights: [
      "Developed production-grade REST APIs and microservices using Python (FastAPI), MongoDB, and PostgreSQL.",
      "Integrated Celery, Redis, and RabbitMQ for asynchronous job scheduling and background task execution.",
      "Led backend for 'Stock Wars' — a virtual stock trading game, handling 10K+ concurrent users with efficient caching and messaging.",
      "Deployed services using Docker and Kubernetes, improving reliability and deployment speed by 40%."
    ],
    isCurrent: false
  },
  {
    name: "Mindtree Limited",
    position: "Software Developer",
    location: "Bangalore, Karnataka",
    startDate: "Jul 2021",
    endDate: "Feb 2022",
    summary: "Global technology consulting and services company.",
    highlights: [
      "Developed backend APIs and database schemas (Python, PostgreSQL) for internal enterprise applications.",
      "Focused on performance optimization and backend automation in client projects."
    ],
    isCurrent: false
  }
];

const Experience = () => {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <motion.p 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          /experience
        </motion.p>
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Work History
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.name}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-marker">
                <div className={`marker-dot ${exp.isCurrent ? 'current' : ''}`}></div>
                {index < experiences.length - 1 && <div className="marker-line"></div>}
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-company">
                      {exp.name}
                      {exp.yc && <span className="yc-tag">YC W23</span>}
                    </h3>
                    <p className="timeline-position">{exp.position}</p>
                  </div>
                  <div className="timeline-date">
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </div>
                </div>
                <p className="timeline-location">{exp.location}</p>
                <p className="timeline-summary">{exp.summary}</p>
                <ul className="timeline-highlights">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;