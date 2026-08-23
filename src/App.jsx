import Galaxy from './components/Galaxy';
import Nebula from './components/Nebula';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Signal from './components/Signal';
import NowStrip from './components/NowStrip';
import Experience from './components/Experience';
import Work from './components/Work';
import Stack from './components/Stack';
import Contact from './components/Contact';
import './styles/components.css';

function App() {
  return (
    <div className="page">
      <Galaxy />
      <Nebula />
      <Nav />
      <main>
        <Hero />
        <Signal />
        <NowStrip />
        <Experience />
        <Work />
        <Stack />
      </main>
      <Contact />
    </div>
  );
}

export default App;
