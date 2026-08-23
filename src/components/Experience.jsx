import Reveal from './Reveal';

const jobs = [
  {
    num: '01',
    company: 'Mantys',
    role: 'Software Development Engineer',
    chips: ['Current', 'Founding team'],
    dates: ['Apr 2025 —', 'Present'],
    location: 'Bangalore, KA',
    summary:
      'Healthcare technology company automating insurance eligibility verification for hospitals and clinics across the UAE.',
    bullets: [
      'Scaled the core insurance eligibility pipeline from 40K checks per month to <b>344K+ per week</b> (~35× throughput) through Celery queue partitioning, Redis caching, and worker concurrency tuning.',
      'Design and operate LLM transformation workflows on Azure OpenAI that convert unstructured HTML into structured JSON at <b>95%+ accuracy</b>, powering real-time eligibility verification across 50+ hospitals and clinics.',
      'Build automated data-retrieval pipelines in Python and Playwright against hospital portals and payer systems, cutting manual patient-data lookup time by <b>80%</b>.',
      'Ship and maintain the production Chrome extension used at hospital front desks — Emirates ID, Member ID, and DHA ID verification integrated with hospital information systems for automated form filling and document upload — reducing user-reported issues by <b>90%</b>.',
      'Partner with the CTO on backend architecture, reliability, and observability for the core product, contributing to <b>$2.5M+</b> in company ARR.',
    ],
    stack: ['python', 'fastapi', 'celery', 'redis', 'rabbitmq', 'kubernetes', 'azure-openai', 'playwright'],
  },
  {
    num: '02',
    company: 'Vigilare Technologies',
    role: 'Founder & Lead Backend Engineer',
    chips: ['Founder'],
    dates: ['Jan 2024 —', 'Feb 2025'],
    location: 'Bhavnagar, GJ',
    summary:
      'Defense-tech startup building Drishti, a GPS-denied autonomous drone system for mapping and inspection.',
    bullets: [
      'Founded and led a defense-tech startup building <b>Drishti</b>, a GPS-denied autonomous drone system for mapping and inspection.',
      'Architected FastAPI backend services and REST APIs for real-time telemetry streaming and mission control between onboard compute and ground station.',
      'Built ROS2 packages for sensor fusion and Visual-Inertial Odometry (VIO), with MQTT-based telemetry transport across the drone-to-ground link.',
      'Containerized the full stack with Docker and deployed on K3s, enabling modular, independently versioned releases on edge hardware.',
    ],
    stack: ['python', 'fastapi', 'ros2', 'mqtt', 'docker', 'k3s'],
  },
  {
    num: '03',
    company: 'Zu Technologies',
    role: 'Backend Developer, B2B SaaS',
    chips: [],
    dates: ['May 2022 —', 'Sep 2023'],
    location: 'Bangalore, KA',
    summary: 'B2B SaaS company building engagement and gamification platforms.',
    bullets: [
      'Led the backend for <b>Stock Wars</b>, a real-time virtual stock-trading platform serving <b>10K+ concurrent users</b>, using Redis caching and message queues to hold latency stable under peak load.',
      'Built production REST APIs and microservices in Python (FastAPI) with MongoDB, designed for latency-critical trading workflows.',
      'Integrated Celery, Redis, and RabbitMQ for asynchronous job scheduling and background task execution.',
      'Deployed services on Docker and Kubernetes, improving deployment speed and reliability by <b>40%</b>.',
    ],
    stack: ['python', 'fastapi', 'mongodb', 'celery', 'redis', 'rabbitmq', 'docker', 'kubernetes'],
  },
  {
    num: '04',
    company: 'Mindtree Limited',
    role: 'Software Developer',
    chips: [],
    dates: ['Jul 2021 —', 'Feb 2022'],
    location: 'Bangalore, KA',
    summary: 'Global technology consulting and services company.',
    bullets: [
      'Built backend APIs and database schemas in Python for internal enterprise applications.',
      'Drove performance optimization and backend automation across client projects.',
    ],
    stack: ['python', 'sql', 'rest apis'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-label">Experience</h2>

        <div className="exp-rows">
          {jobs.map((job, index) => (
            <Reveal key={job.num} delay={index * 0.06} className="exp-row">
              <div className="exp-idx">{job.num}</div>

              <div className="exp-meta">
                <div className="exp-when">
                  {job.dates[0]}
                  <br />
                  {job.dates[1]}
                </div>
                <div className="exp-where">{job.location}</div>
              </div>

              <div className="exp-main">
                <div className="exp-co">
                  <h3 className="exp-name">{job.company}</h3>
                  {job.chips.map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="exp-pos">{job.role}</div>
                <p className="exp-summary">{job.summary}</p>

                <ul className="exp-bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} dangerouslySetInnerHTML={{ __html: bullet }} />
                  ))}
                </ul>

                <div className="stack-strip">
                  {job.stack.map((tech) => (
                    <span key={tech} className="tok">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
