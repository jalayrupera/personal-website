import { useEffect, useRef } from 'react';

/* Tunables -------------------------------------------------------------- */
const PARALLAX_RANGE = 700;   // px of vertical travel for the deep layer
const DEEP_RATE = 0.12;       // galaxy scroll rate
const NEAR_RATE = 0.45;       // foreground star scroll rate
const BAND_ANGLE = -22;       // degrees; band rises left -> right
const DRIFT = 5.5;            // px/sec the galaxy streams along its own axis
const NEAR_DRIFT = 2.4;       // foreground drifts faster, for depth
const BAND_STARS = 3800;      // density reference, per 2x reach
const FIELD_STARS = 760;
const NEAR_STARS = 90;
const ANCHORS = 7;
const LANES = 7;

/* Normally-distributed value, mean 0 / sd 1 (Box-Muller). */
function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* One period of the galactic band, painted in band-local space: x runs along
   the axis, y across it. Because the band is statistically uniform along its
   axis, laying this tile end to end is seamless — which is what lets the
   whole thing drift forever without a wrap artifact. */
function paintBandTile(ctx, length, height, sigma, count) {
  const mid = height / 2;
  ctx.clearRect(0, 0, length, height);

  for (let i = 0; i < count; i += 1) {
    const off = gauss() * sigma;
    if (Math.abs(off) > mid) continue;

    const x = Math.random() * length;
    const falloff = Math.exp(-(off * off) / (2 * sigma * sigma));
    const r = 0.3 + Math.pow(Math.random(), 3.2) * 1.15;
    const a = (0.16 + Math.random() * 0.5) * falloff;

    const tint = Math.random();
    let rgb = '236, 238, 244';
    if (tint > 0.88) rgb = '255, 214, 190';       // warm giants
    else if (tint > 0.62) rgb = '196, 200, 255';  // cool blues

    ctx.fillStyle = `rgba(${rgb}, ${a.toFixed(3)})`;
    if (r < 0.75) {
      ctx.fillRect(x, mid + off, r * 2, r * 2);
    } else {
      ctx.beginPath();
      ctx.arc(x, mid + off, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default function Galaxy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tile = document.createElement('canvas');
    const tileCtx = tile.getContext('2d');

    let width = 0;
    let height = 0;
    let ready = false;
    let frame = null;
    let scrollY = 0;

    /* Band geometry, all recomputed on resize. */
    let rad = 0;
    let reach = 0;
    let sigma = 0;
    let tileLen = 0;
    let tileH = 0;
    let halo = null;
    let core = null;
    let lane = null;
    let anchorGlow = null;
    let lanes = [];
    let field = [];
    let anchors = [];
    let near = [];

    const seed = () => {
      lanes = Array.from({ length: LANES }, () => ({
        x: Math.random() * tileLen,
        y: gauss() * sigma * 0.45,
        w: reach * (0.1 + Math.random() * 0.22),
        h: sigma * (0.28 + Math.random() * 0.5),
      }));

      field = Array.from({ length: FIELD_STARS }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.32 + Math.pow(Math.random(), 3) * 0.95,
        a: 0.12 + Math.random() * 0.34,
      }));

      anchors = Array.from({ length: ANCHORS }, () => ({
        x: Math.random(),
        y: Math.random(),
      }));

      near = Array.from({ length: NEAR_STARS }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.7 + Math.random() * 1.05,
        a: 0.3 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        rgb: Math.random() > 0.7 ? '200, 206, 255' : '236, 238, 244',
      }));
    };

    /* Wrap a value into [0, span). */
    const wrap = (value, span) => ((value % span) + span) % span;

    const render = (time) => {
      if (!ready) return;

      const reduced = motionQuery.matches;
      const drift = reduced ? 0 : (time / 1000) * DRIFT;
      const deepShift = reduced ? 0 : Math.min(scrollY * DEEP_RATE, PARALLAX_RANGE);
      const cosR = Math.cos(rad);
      const sinR = Math.sin(rad);

      ctx.clearRect(0, 0, width, height);

      /* --- band: glow, then drifting star tiles, in rotated space --- */
      ctx.save();
      ctx.translate(width * 0.6, (height + PARALLAX_RANGE) * 0.3 - deepShift);
      ctx.rotate(rad);

      /* The glow is uniform along the axis, so drift leaves it unchanged —
         it never needs to move, only the structure inside it does. */
      ctx.fillStyle = halo;
      ctx.fillRect(-reach, -sigma * 4.5, reach * 2, sigma * 9);
      ctx.fillStyle = core;
      ctx.fillRect(-reach, -sigma * 1.4, reach * 2, sigma * 2.8);

      let start = wrap(drift, tileLen);
      while (start > -reach) start -= tileLen;
      for (let x = start; x < reach; x += tileLen) {
        ctx.drawImage(tile, x, -tileH / 2, tileLen, tileH);
      }
      ctx.restore();

      /* --- field stars, drifting with the band and wrapping on screen --- */
      for (let i = 0; i < field.length; i += 1) {
        const s = field[i];
        const x = wrap(s.x * width + drift * cosR, width);
        const y = wrap(s.y * height + drift * sinR - deepShift, height);
        ctx.fillStyle = `rgba(236, 238, 244, ${s.a.toFixed(3)})`;
        ctx.fillRect(x, y, s.r * 2, s.r * 2);
      }

      for (let i = 0; i < anchors.length; i += 1) {
        const s = anchors[i];
        const x = wrap(s.x * width + drift * cosR, width);
        const y = wrap(s.y * height + drift * sinR - deepShift, height);
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(7, 7);
        ctx.fillStyle = anchorGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* --- dust lanes erase band and field alike, revealing the page --- */
      ctx.save();
      ctx.translate(width * 0.6, (height + PARALLAX_RANGE) * 0.3 - deepShift);
      ctx.rotate(rad);
      ctx.globalCompositeOperation = 'destination-out';
      for (let x = start; x < reach; x += tileLen) {
        for (let i = 0; i < lanes.length; i += 1) {
          const l = lanes[i];
          ctx.save();
          ctx.translate(x + l.x, l.y);
          ctx.scale(l.w, l.h);
          ctx.fillStyle = lane;
          ctx.beginPath();
          ctx.arc(0, 0, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();

      /* --- foreground stars: faster drift, twinkle, drawn after the lanes
             so nearby stars are never occluded by distant dust --- */
      const nearDrift = drift * NEAR_DRIFT;
      for (let i = 0; i < near.length; i += 1) {
        const s = near[i];
        const x = wrap(s.x * width + nearDrift * cosR, width);
        const y = wrap(s.y * height + nearDrift * sinR - scrollY * (reduced ? 0 : NEAR_RATE), height);
        const alpha = reduced ? s.a : s.a * (0.62 + 0.38 * Math.sin(time / 1600 + s.phase));
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
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
      width = window.innerWidth;
      height = window.innerHeight;

      if (width < 1 || height < 1) {
        ready = false;
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      rad = (BAND_ANGLE * Math.PI) / 180;
      const deepH = height + PARALLAX_RANGE;
      reach = Math.hypot(width, deepH);
      sigma = Math.max(deepH * 0.075, 70);
      /* A full period spans the whole visible band, so the dust lanes inside
         it never appear twice on screen at once. */
      tileLen = Math.max(1600, reach * 2);
      tileH = sigma * 7.6;

      /* Gradients are stored in user space and transformed by the CTM at
         paint time, so these can be built once and reused under rotation. */
      halo = ctx.createLinearGradient(0, -sigma * 4.5, 0, sigma * 4.5);
      halo.addColorStop(0, 'rgba(88, 96, 168, 0)');
      halo.addColorStop(0.5, 'rgba(104, 112, 190, 0.095)');
      halo.addColorStop(1, 'rgba(88, 96, 168, 0)');

      core = ctx.createLinearGradient(0, -sigma * 1.4, 0, sigma * 1.4);
      core.addColorStop(0, 'rgba(198, 196, 226, 0)');
      core.addColorStop(0.5, 'rgba(216, 210, 232, 0.14)');
      core.addColorStop(1, 'rgba(198, 196, 226, 0)');

      lane = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      lane.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      lane.addColorStop(1, 'rgba(0, 0, 0, 0)');

      anchorGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      anchorGlow.addColorStop(0, 'rgba(236, 238, 244, 0.75)');
      anchorGlow.addColorStop(0.25, 'rgba(200, 206, 255, 0.16)');
      anchorGlow.addColorStop(1, 'rgba(200, 206, 255, 0)');

      /* The tile is blitted, so it can render below device resolution
         without the softness reading as a defect on a diffuse band. Large
         displays scale down further to keep the buffer bounded. */
      let tileDpr = Math.min(dpr, 1.5);
      const budget = 8e6;
      const area = tileLen * tileH * tileDpr * tileDpr;
      if (area > budget) tileDpr = Math.max(0.75, tileDpr * Math.sqrt(budget / area));
      tile.width = Math.round(tileLen * tileDpr);
      tile.height = Math.round(tileH * tileDpr);
      tileCtx.setTransform(tileDpr, 0, 0, tileDpr, 0, 0);

      seed();
      paintBandTile(
        tileCtx,
        tileLen,
        tileH,
        sigma,
        Math.round((BAND_STARS * tileLen) / (2 * reach))
      );

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
