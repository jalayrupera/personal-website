import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { RESUME_FILE } from '../data/profile';

const navItems = [
  { to: 'experience', label: 'Experience' },
  { to: 'stack', label: 'Stack' },
  { to: 'contact', label: 'Contact' },
];

const ids = navItems.map((item) => item.to);

/* react-scroll's own spy ran a section behind and could never light the
   last link: contact is shorter than the viewport, so its top never
   reaches the trigger line. Track the sections directly instead. */
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const doc = document.documentElement;

      // At the very bottom the last section owns the nav, whether or not
      // it was ever tall enough to cross the line on its own.
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }

      const line = window.scrollY + 140;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

export default function Nav() {
  const active = useActiveSection();

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <ScrollLink to="top" smooth offset={-80} duration={500} className="nav-logo">
          J<span className="nav-logo-dot">·</span>RUPERA
        </ScrollLink>

        <div className="nav-right">
          <div className="nav-links">
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth
                offset={-90}
                duration={500}
                className={`nav-link${active === item.to ? ' active' : ''}`}
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>

          <a href={RESUME_FILE} download className="nav-resume">
            Résumé ↓
          </a>
        </div>
      </div>
    </nav>
  );
}
