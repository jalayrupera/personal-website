import Reveal from './Reveal';

const projects = [
  {
    name: 'Insurance Eligibility Platform',
    entity: 'Mantys',
    metric: '344K+ checks / wk',
    description:
      'End-to-end eligibility system used by 50+ hospitals and clinics across the UAE — a Chrome extension at the front desk backed by FastAPI services, Celery retrieval pipelines, and LLM transformation workflows. Real-time coverage verification via Emirates ID, Member ID, or DHA ID, wired into hospital information systems.',
    stack: ['fastapi', 'celery', 'redis', 'rabbitmq', 'kubernetes', 'azure-openai', 'playwright'],
  },
  {
    name: 'Drishti — Autonomous Drone System',
    entity: 'Vigilare Technologies',
    metric: 'GPS-denied',
    description:
      'Navigation stack for a drone that flies without GPS: sensor drivers, visual-inertial odometry, and MQTT telemetry between onboard compute and ground station. FastAPI mission-control services containerized with Docker and deployed on K3s at the edge.',
    stack: ['ros2', 'vio', 'mqtt', 'fastapi', 'docker', 'k3s'],
  },
  {
    name: 'Stock Wars — Virtual Trading',
    entity: 'Zu Technologies',
    metric: '10K+ concurrent',
    description:
      'Real-time virtual stock-trading platform holding latency stable for 10K+ concurrent users under peak load — FastAPI and MongoDB behind a Redis cache, with Celery and RabbitMQ absorbing the asynchronous work.',
    stack: ['fastapi', 'mongodb', 'celery', 'redis', 'rabbitmq'],
  },
];

export default function Work() {
  return (
    <section id="work" className="section section-rule">
      <div className="container">
        <h2 className="section-label">Selected work</h2>

        <div className="work-grid">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08} as="article" className="work-card">
              <div className="work-top">
                <span className="work-entity">{project.entity}</span>
                <span className="work-metric">{project.metric}</span>
              </div>
              <h3 className="work-title">{project.name}</h3>
              <p className="work-desc">{project.description}</p>
              <div className="stack-strip">
                {project.stack.map((tech) => (
                  <span key={tech} className="tok">
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
