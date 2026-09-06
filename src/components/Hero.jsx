import { EMAIL, RESUME_FILE } from '../data/profile';

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
          <span>Full Stack Engineer</span>
          <span>Distributed Systems</span>
          <span>Python + TypeScript</span>
        </div>

        <p className="hero-thesis">
          I build and operate the asynchronous Python systems behind{' '}
          <b>344,000</b> patient eligibility checks a week — and the interfaces
          hospital staff use to run them.
        </p>

        <div className="hero-actions">
          <a href={RESUME_FILE} download className="btn btn-fill">
            Résumé ↓
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
            Email
          </a>
        </div>

      </div>
    </header>
  );
}
