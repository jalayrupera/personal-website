import Reveal from './Reveal';

/* Four rows, not eight. Every tool that already appears in a role's tag
   row is dropped here — this section carries only what the roles above
   it cannot say on their own. */
const groups = [
  { name: 'Languages', items: ['python', 'typescript', 'javascript', 'sql'] },
  {
    name: 'Distributed systems',
    items: [
      'message queues',
      'task scheduling',
      'caching',
      'horizontal scaling',
      'async programming',
      'system design',
    ],
  },
  {
    name: 'Infrastructure',
    items: ['kubernetes', 'docker', 'azure', 'aws', 'ci/cd', 'observability'],
  },
  {
    name: 'AI / LLM',
    items: ['azure openai', 'llm orchestration', 'structured extraction', 'prompt engineering'],
  },
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
        </div>

        {/* Not a stack row — it sat inside the table as a sans-serif
            stowaway among mono tags. */}
        <Reveal delay={0.2} as="p" className="stack-edu">
          B.Tech, Computer Science — REVA University, Bangalore
          <span className="stack-edu-years">2017 – 2021</span>
        </Reveal>
      </div>
    </section>
  );
}
