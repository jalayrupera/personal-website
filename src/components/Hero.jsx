import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_FILE } from '../data/profile';

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="container">
        <div className="hero-kicker">Bangalore, IN · UTC+5:30</div>

        <h1 className="hero-name">
          Jalay
          <br />
          Rupera<span className="dot">.</span>
        </h1>

        <div className="hero-role">
          <span>Backend Engineer</span>
          <span className="hot">Distributed Systems</span>
          <span>Python</span>
        </div>

        <p className="hero-thesis">
          I build and operate the asynchronous Python systems behind{' '}
          <b>344,000</b> patient eligibility checks a week.
        </p>

        <div className="hero-actions">
          <a href={RESUME_FILE} download className="btn btn-fill">
            Résumé ↓
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
            Email
          </a>
        </div>

        <div className="hero-social">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </header>
  );
}
