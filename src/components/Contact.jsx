import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  RESUME_FILE,
  SITE_REPO_URL,
} from '../data/profile';

export default function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="container">
        <h2 className="contact-headline">
          Open to full-stack and distributed-systems roles<span className="dot">.</span>
        </h2>
        <p className="contact-copy">
          Happy to talk about queue architecture, scaling async workloads, or the interfaces that
          sit in front of them.
        </p>

        <a href={`mailto:${EMAIL}`} className="contact-email">
          {EMAIL}
        </a>

        <div className="contact-links">
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={RESUME_FILE} download>
            Résumé ↓
          </a>
        </div>

        <div className="contact-foot">
          <span>© 2026 Jalay Rupera</span>
          <span className="contact-colophon">
            React and Vite, with the galaxy hand-written on a canvas.{' '}
            <a href={SITE_REPO_URL} target="_blank" rel="noopener noreferrer">
              Source ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
