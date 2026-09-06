import { useEffect } from 'react';

import Galaxy from './components/Galaxy';
import Nebula from './components/Nebula';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Signal from './components/Signal';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Contact from './components/Contact';
import { initAnalytics, trackLinkClicks } from './lib/analytics';
import './styles/components.css';

function App() {
  useEffect(() => {
    initAnalytics();
    return trackLinkClicks();
  }, []);

  return (
    <div className="page">
      <Galaxy />
      <Nebula />
      <Nav />
      <main>
        <Hero />
        <Signal />
        <Experience />
        <Stack />
      </main>
      <Contact />
    </div>
  );
}

export default App;
