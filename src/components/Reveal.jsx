import { motion, useReducedMotion } from 'framer-motion';

/* Scroll reveal: 16px rise + fade, fires once. Collapses to a plain
   div when the visitor asks for reduced motion. */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
