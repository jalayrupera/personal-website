import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-terminal">
            <span className="prompt">$</span> cat footer.json
          </div>
          <div className="footer-output">
            <span className="bracket">{'{'}</span>
            <div className="footer-line">
              <span className="key">"status"</span>: <span className="string">"Available for opportunities"</span>,
            </div>
            <div className="footer-line">
              <span className="key">"location"</span>: <span className="string">"Bangalore, India"</span>,
            </div>
            <div className="footer-line">
              <span className="key">"built_with"</span>: <span className="string">"React + Vite"</span>
            </div>
            <span className="bracket">{'}'}</span>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copy">
              Designed & Built by <span className="accent">Jalay Rupera</span>
            </p>
            <p className="footer-year">
              {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;