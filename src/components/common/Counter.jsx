import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

// Counts up from 0 to `value` once the element scrolls into view.
// `suffix` (e.g. "+") is appended after the animation reaches its target.
const Counter = ({ value, suffix = '', duration = 1.6, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) { setDisplay(value); return; }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration, reduced]);

  return (
    <h3 className={className} ref={ref}>
      {display}{suffix}
    </h3>
  );
};

export default Counter;
