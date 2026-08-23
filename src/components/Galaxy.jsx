import { useEffect, useRef } from 'react';

/* Tunables -------------------------------------------------------------- */
const PARALLAX_RANGE = 700;   // px of vertical travel for the deep layer
const DEEP_RATE = 0.12;       // galaxy + field stars scroll rate
const NEAR_RATE = 0.45;       // foreground stars scroll rate
const BAND_ANGLE = -22;       // degrees; band rises left -> right
const BAND_STARS = 3800;
const FIELD_STARS = 760;
const NEAR_STARS = 90;

/* Normally-distributed value, mean 0 / sd 1 (Box-Muller). */
function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* Paint the static layer: galactic band, dust lanes, scattered field. */
function paintDeep(ctx, w, h) {
  const rad = (BAND_ANGLE * Math.PI) / 180;
  const cx = w * 0.6;
  const cy = h * 0.3;
  const reach = Math.hypot(w, h);        // long enough to cross the canvas
  const sigma = Math.max(h * 0.075, 70); // band thickness

  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rad);

  /* Diffuse halo, then a tighter warm core -- both very low alpha so the
     band reads as luminance rather than a painted smear. */
  const halo = ctx.createLinearGradient(0, -sigma * 4.5, 0, sigma * 4.5);
  halo.addColorStop(0, 'rgba(88, 96, 168, 0)');
  halo.addColorStop(0.5, 'rgba(104, 112, 190, 0.095)');
  halo.addColorStop(1, 'rgba(88, 96, 168, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(-reach, -sigma * 4.5, reach * 2, sigma * 9);

  const core = ctx.createLinearGradient(0, -sigma * 1.4, 0, sigma * 1.4);
  core.addColorStop(0, 'rgba(198, 196, 226, 0)');
  core.addColorStop(0.5, 'rgba(216, 210, 232, 0.14)');
  core.addColorStop(1, 'rgba(198, 196, 226, 0)');
  ctx.fillStyle = core;
  ctx.fillRect(-reach, -sigma * 1.4, reach * 2, sigma * 2.8);

  /* Band stars: density falls off normally with distance from the axis. */
  for (let i = 0; i < BAND_STARS; i += 1) {
    const x = (Math.random() * 2 - 1) * reach;
    const off = gauss() * sigma;
    if (Math.abs(off) > sigma * 3.6) continue;

    const falloff = Math.exp(-(off * off) / (2 * sigma * sigma));
    const r = 0.3 + Math.pow(Math.random(), 3.2) * 1.15;
    const a = (0.16 + Math.random() * 0.5) * falloff;

    const tint = Math.random();
    let rgb = '236, 238, 244';
    if (tint > 0.88) rgb = '255, 214, 190';       // warm giants
    else if (tint > 0.62) rgb = '196, 200, 255';  // cool blues

    ctx.fillStyle = `rgba(${rgb}, ${a.toFixed(3)})`;
    if (r < 0.75) {
      ctx.fillRect(x, off, r * 2, r * 2);
    } else {
      ctx.beginPath();
      ctx.arc(x, off, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* Dust lanes carve the great rift straight through band and stars alike. */
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 7; i += 1) {
    const lx = (Math.random() * 2 - 1) * reach * 0.85;
    const ly = gauss() * sigma * 0.45;
    const lw = reach * (0.1 + Math.random() * 0.22);
    const lh = sigma * (0.28 + Math.random() * 0.5);

    ctx.save();
    ctx.translate(lx, ly);
    ctx.scale(lw, lh);
    const lane = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    lane.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    lane.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lane;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();

  /* Sparse field across the rest of the sky, so the band has somewhere to sit. */
  for (let i = 0; i < FIELD_STARS; i += 1) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 0.32 + Math.pow(Math.random(), 3) * 0.95;
    const a = 0.12 + Math.random() * 0.34;
    ctx.fillStyle = `rgba(236, 238, 244, ${a.toFixed(3)})`;
    ctx.fillRect(x, y, r * 2, r * 2);
  }

  /* A handful of anchor stars with a soft halo. */
  for (let i = 0; i < 7; i += 1) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 7);
    glow.addColorStop(0, 'rgba(236, 238, 244, 0.75)');
    glow.addColorStop(0.25, 'rgba(200, 206, 255, 0.16)');
    glow.addColorStop(1, 'rgba(200, 206, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function Galaxy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const deep = document.createElement('canvas');
    const deepCtx = deep.getContext('2d');

    let dpr = 1;
    let width = 0;
    let height = 0;
    let near = [];
    let frame = null;
    let scrollY = 0;
    let ready = false;

    const seedNear = () => {
      near = Array.from({ length: NEAR_STARS }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.7 + Math.random() * 1.05,
        a: 0.3 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        rgb: Math.random() > 0.7 ? '200, 206, 255' : '236, 238, 244',
      }));
    };

    const render = (time) => {
      if (!ready) return;
      const reduced = motionQuery.matches;
      const deepShift = reduced ? 0 : Math.min(scrollY * DEEP_RATE, PARALLAX_RANGE);

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(deep, 0, -deepShift, width, height + PARALLAX_RANGE);

      const nearShift = reduced ? 0 : (scrollY * NEAR_RATE) % height;
      for (let i = 0; i < near.length; i += 1) {
        const s = near[i];
        let y = s.y * height - nearShift;
        if (y < 0) y += height;

        const alpha = reduced ? s.a : s.a * (0.62 + 0.38 * Math.sin(time / 1600 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * width, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    /* A hidden tab or a collapsed pane reports a zero-sized viewport, which
       leaves nothing to paint. Re-measure until it comes back rather than
       leaving a permanently dead canvas. */
    const loop = (time) => {
      if (!ready) measure();
      render(time);
      frame = requestAnimationFrame(loop);
    };

    /* Reduced motion draws one frame, so it only needs to keep ticking for
       as long as the viewport is still unmeasurable. */
    const settle = (time) => {
      if (!ready) measure();
      render(time);
      frame = ready ? null : requestAnimationFrame(settle);
    };

    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    const start = () => {
      stop();
      if (motionQuery.matches) settle(performance.now());
      else frame = requestAnimationFrame(loop);
    };

    const measure = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      if (width < 1 || height < 1) {
        ready = false;
        return;
      }

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const deepH = height + PARALLAX_RANGE;
      deep.width = Math.round(width * dpr);
      deep.height = Math.round(deepH * dpr);
      deepCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintDeep(deepCtx, width, deepH);

      seedNear();
      ready = true;
    };

    const resize = () => {
      measure();
      start();
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };

    let resizeTimer = null;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 160);
    };

    resize();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    motionQuery.addEventListener('change', start);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motionQuery.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={canvasRef} className="galaxy" aria-hidden="true" />;
}
