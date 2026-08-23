import { useEffect, useRef, useState } from 'react';

/* Ticks a number up to `target` when the element scrolls into view.
   Returns [ref, value].

   The value starts at `target`, not at zero: a readout that is already on
   screen at load, or one whose animation never gets frames (reduced motion,
   a backgrounded tab), must still show the real figure. Counting only ever
   begins when the element crosses into view from below. */
export default function useCountUp(target, duration = 1100) {
  const ref = useRef(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    /* Already on screen before the first scroll — nothing to animate into. */
    if (node.getBoundingClientRect().top < window.innerHeight) return undefined;

    let frame = null;
    let start = null;

    const step = (time) => {
      if (start === null) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        setValue(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      setValue(target);
    };
  }, [target, duration]);

  return [ref, value];
}
