import { Link as ScrollLink } from 'react-scroll';
import { RESUME_FILE } from '../data/profile';

const navItems = [
  { to: 'experience', label: 'Experience' },
  { to: 'work', label: 'Work' },
  { to: 'stack', label: 'Stack' },
  { to: 'contact', label: 'Contact' },
];

export default function Nav() {
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
                spy
                smooth
                offset={-90}
                duration={500}
                activeClass="active"
                className="nav-link"
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
