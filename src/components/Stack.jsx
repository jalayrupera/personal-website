import Reveal from './Reveal';

const groups = [
  { name: 'Languages', items: ['python', 'typescript', 'sql', 'bash'] },
  {
    name: 'Backend',
    items: ['fastapi', 'rest api design', 'microservices', 'async programming', 'system design'],
  },
  {
    name: 'Distributed systems',
    items: [
      'celery',
      'rabbitmq',
      'redis',
      'message queues',
      'task scheduling',
      'caching',
      'horizontal scaling',
    ],
  },
  { name: 'Data', items: ['mongodb', 'redis', 'schema design', 'data modeling'] },
  {
    name: 'Infrastructure',
    items: ['docker', 'kubernetes', 'k3s', 'azure', 'aws', 'ci/cd', 'linux', 'observability'],
  },
  {
    name: 'AI / LLM',
    items: [
      'azure openai',
      'llm orchestration',
      'structured extraction',
      'prompt engineering',
    ],
  },
  { name: 'Tools', items: ['playwright', 'git', 'ros2', 'mqtt'] },
];

export default function Stack() {
  return (
    <section id="stack" className="section section-rule">
      <div className="container">
        <h2 className="section-label">Stack</h2>

        <div className="stack-rows">
          {groups.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.04} className="stack-row">
              <div className="stack-name">{group.name}</div>
              <div className="stack-items">
                {group.items.map((item) => (
                  <span key={item} className="tok">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.28} className="stack-row">
            <div className="stack-name">Education</div>
            <div className="stack-edu">
              B.Tech, Computer Science — REVA University, Bangalore
              <span className="stack-edu-years">2017 – 2021</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
