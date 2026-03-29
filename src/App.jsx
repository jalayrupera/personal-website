import { Link as ScrollLink, scroller } from 'react-scroll';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const navItems = [
  { to: 'about', label: 'about' },
  { to: 'experience', label: 'experience' },
  { to: 'projects', label: 'projects' },
  { to: 'skills', label: 'skills' },
  { to: 'contact', label: 'contact' },
];

function App() {
  const scrollTo = (to) => {
    scroller.scrollTo(to, {
      smooth: true,
      offset: -80,
      duration: 500,
    });
  };

  return (
    <div className="app">
      <div className="grid-bg"></div>
      <div className="noise"></div>
      
      <nav className="nav">
        <div className="nav-container">
          <ScrollLink 
            to="hero" 
            smooth={true} 
            offset={-80} 
            duration={500}
            className="nav-logo"
          >
            <span className="logo-bracket">&lt;</span>
            JR
            <span className="logo-bracket">/&gt;</span>
          </ScrollLink>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                offset={-80}
                duration={500}
                className="nav-link"
                activeClass="nav-link-active"
                spy={true}
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>
        </div>
      </nav>
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;