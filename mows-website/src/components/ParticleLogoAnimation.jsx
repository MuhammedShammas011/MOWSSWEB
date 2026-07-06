import { useEffect, useRef, useCallback } from 'react';

// ─── Easing ──────────────────────────────────────────────────────────────────
const easeOutExpo    = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

// ─── Sample pixels from an Image into an offscreen canvas ───────────────────
function sampleImagePixels(img, canvasW, canvasH, density) {
  const off = document.createElement('canvas');
  off.width  = canvasW;
  off.height = canvasH;
  const ctx = off.getContext('2d');

  // Scale-fit the logo inside the canvas with generous padding
  const padX = canvasW * 0.10;
  const padY = canvasH * 0.22;
  const maxW  = canvasW - padX * 2;
  const maxH  = canvasH - padY * 2;
  const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  const dw    = img.naturalWidth  * scale;
  const dh    = img.naturalHeight * scale;
  const dx    = (canvasW - dw) / 2;
  const dy    = (canvasH - dh) / 2;

  // Draw white silhouette: first draw image, then use source-in to fill white
  ctx.drawImage(img, dx, dy, dw, dh);
  // Fill white using composite
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasW, canvasH);
  ctx.globalCompositeOperation = 'source-over';

  const imageData = ctx.getImageData(0, 0, canvasW, canvasH);
  const pixels = [];
  for (let y = 0; y < canvasH; y += density) {
    for (let x = 0; x < canvasW; x += density) {
      const idx = (y * canvasW + x) * 4;
      if (imageData.data[idx + 3] > 128) {
        pixels.push({ x, y });
      }
    }
  }
  return pixels;
}

// ─── Sample percent text pixels ──────────────────────────────────────────────
function getPercentPixels(percent, canvasW, canvasH, density) {
  const off = document.createElement('canvas');
  off.width  = canvasW;
  off.height = canvasH;
  const ctx = off.getContext('2d');
  const fontSize = Math.min(canvasW * 0.28, canvasH * 0.55);
  ctx.fillStyle    = '#ffffff';
  ctx.font         = `900 ${fontSize}px 'Arial Black', Arial, sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${Math.round(percent)}%`, canvasW / 2, canvasH / 2);
  const imageData = ctx.getImageData(0, 0, canvasW, canvasH);
  const pixels = [];
  for (let y = 0; y < canvasH; y += density) {
    for (let x = 0; x < canvasW; x += density) {
      const idx = (y * canvasW + x) * 4;
      if (imageData.data[idx + 3] > 128) {
        pixels.push({ x, y });
      }
    }
  }
  return pixels;
}

export default function ParticleLogoAnimation() {
  const canvasRef  = useRef(null);
  const logoImgRef = useRef(null);   // holds the loaded HTMLImageElement
  const stateRef   = useRef({
    phase:         'loading',  // 'loading' | 'morphing' | 'logo'
    particles:     [],
    logoPixels:    [],
    loadProgress:  0,
    morphProgress: 0,
    mouseX:        -9999,
    mouseY:        -9999,
    animFrame:     null,
    startTime:     null,
    morphStartTime:null,
    lastPercent:   -1,
    ready:         false,      // logo image loaded?
  });

  // ── Build / rebuild particles ─────────────────────────────────────────────
  const initParticles = useCallback((canvas) => {
    const s   = stateRef.current;
    const img = logoImgRef.current;
    if (!img) return;

    const w = canvas.width;
    const h = canvas.height;
    const isMobile = window.innerWidth < 768;
    const density   = isMobile ? 5 : 3;

    s.logoPixels = sampleImagePixels(img, w, h, density);
    if (s.logoPixels.length === 0) return;

    const startPx   = getPercentPixels(0, w, h, density);
    const logoCount = s.logoPixels.length;
    const count     = Math.max(startPx.length, logoCount);

    s.particles = [];
    for (let i = 0; i < count; i++) {
      const src  = startPx[i % startPx.length];
      const logo = s.logoPixels[i % logoCount];
      s.particles.push({
        x:  src.x + (Math.random()-0.5)*2,
        y:  src.y + (Math.random()-0.5)*2,
        px: src.x,
        py: src.y,
        lx: logo.x + (Math.random()-0.5)*2,
        ly: logo.y + (Math.random()-0.5)*2,
        vx: 0,
        vy: 0,
        sx: Math.random() * w,
        sy: Math.random() * h,
        size:    Math.random() * 1.3 + 0.5,
        opacity: 0.82 + Math.random() * 0.18,
        glow:    Math.random() > 0.65,
        delay:   Math.random() * 0.4,
      });
    }
    s.lastPercent = -1;
    s.ready = true;
  }, []);

  const updatePercentTargets = useCallback((canvas, percent) => {
    const s = stateRef.current;
    if (s.lastPercent === percent) return;
    s.lastPercent = percent;
    const w = canvas.width;
    const h = canvas.height;
    const density = window.innerWidth < 768 ? 5 : 3;
    const newPx = getPercentPixels(percent, w, h, density);
    for (let i = 0; i < s.particles.length; i++) {
      const src = newPx[i % newPx.length];
      s.particles[i].px = src.x + (Math.random()-0.5)*1.5;
      s.particles[i].py = src.y + (Math.random()-0.5)*1.5;
    }
  }, []);

  // ── Main render loop ──────────────────────────────────────────────────────
  const draw = useCallback((canvas) => {
    const ctx = canvas.getContext('2d');
    const s   = stateRef.current;
    const w   = canvas.width;
    const h   = canvas.height;
    const now = performance.now();

    if (!s.ready) {
      // Still waiting for logo — show blank black
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      s.animFrame = requestAnimationFrame(() => draw(canvas));
      return;
    }

    if (!s.startTime) s.startTime = now;

    // Phase transitions
    if (s.phase === 'loading') {
      const t          = Math.min((now - s.startTime) / 2500, 1);
      const newPercent = Math.round(easeOutExpo(t) * 100);
      s.loadProgress   = newPercent;
      updatePercentTargets(canvas, newPercent);
      if (t >= 1) { s.phase = 'morphing'; s.morphStartTime = now; }
    }

    if (s.phase === 'morphing') {
      s.morphProgress = Math.min((now - s.morphStartTime) / 1800, 1);
      if (s.morphProgress >= 1) s.phase = 'logo';
    }

    // Clear
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // Particle physics constants
    const repelRadius = 90;
    const repelForce  = 7;
    const springK     = 0.07;
    const friction    = 0.80;
    const mx = s.mouseX;
    const my = s.mouseY;

    for (const p of s.particles) {
      // Compute target
      let tx, ty;
      if (s.phase === 'loading') {
        tx = p.px; ty = p.py;
      } else if (s.phase === 'morphing') {
        const rawT = Math.max(0, (s.morphProgress - p.delay * 0.3) / (1 - p.delay * 0.2));
        const mp   = easeInOutCubic(Math.min(rawT, 1));
        if (mp < 0.5) {
          const st = mp * 2;
          tx = p.px + (p.sx - p.px) * st;
          ty = p.py + (p.sy - p.py) * st;
        } else {
          const lt = (mp - 0.5) * 2;
          tx = p.sx + (p.lx - p.sx) * lt;
          ty = p.sy + (p.ly - p.sy) * lt;
        }
      } else {
        tx = p.lx; ty = p.ly;
      }

      // Mouse repulsion (logo phase only)
      if (s.phase === 'logo' && mx > 0) {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          p.vx += (dx / dist) * force * repelForce;
          p.vy += (dy / dist) * force * repelForce;
        }
      }

      // Spring + friction
      p.vx += (tx - p.x) * springK;
      p.vy += (ty - p.y) * springK;
      p.vx *= friction;
      p.vy *= friction;
      p.x  += p.vx;
      p.y  += p.vy;

      // Draw
      const alpha = p.opacity * (s.phase === 'morphing' ? 0.3 + s.morphProgress * 0.7 : 1);

      if (p.glow && s.phase !== 'loading') {
        ctx.save();
        ctx.shadowColor = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    s.animFrame = requestAnimationFrame(() => draw(canvas));
  }, [updatePercentTargets]);

  // ── Mount / unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Load logo image first
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/logo-wordmark.png';

    const onLoad = () => {
      logoImgRef.current = img;
      resize();
      // Reset animation
      const s = stateRef.current;
      s.startTime      = null;
      s.morphStartTime = null;
      s.phase          = 'loading';
      s.loadProgress   = 0;
      s.morphProgress  = 0;
      s.lastPercent    = -1;
    };
    img.addEventListener('load', onLoad);

    const resize = () => {
      const rect  = canvas.parentElement.getBoundingClientRect();
      canvas.width  = Math.max(rect.width  || 480, 320);
      canvas.height = Math.max(rect.height || 420, 280);
      const s = stateRef.current;
      s.startTime      = null;
      s.morphStartTime = null;
      s.phase          = 'loading';
      s.loadProgress   = 0;
      s.morphProgress  = 0;
      s.lastPercent    = -1;
      initParticles(canvas);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      stateRef.current.mouseX = -9999;
      stateRef.current.mouseY = -9999;
    };

    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    stateRef.current.animFrame = requestAnimationFrame(() => draw(canvas));

    return () => {
      if (stateRef.current.animFrame) cancelAnimationFrame(stateRef.current.animFrame);
      canvas.removeEventListener('mousemove',  onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      img.removeEventListener('load', onLoad);
      ro.disconnect();
    };
  }, [initParticles, draw]);

  return (
    <div
      style={{
        width:        '100%',
        height:       '100%',
        minHeight:    420,
        borderRadius: 20,
        overflow:     'hidden',
        background:   '#000',
        position:     'relative',
        cursor:       'crosshair',
        boxShadow:    '0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.7)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
      <div
        style={{
          position:      'absolute',
          bottom:        14,
          right:         18,
          fontSize:      9,
          letterSpacing: '0.18em',
          color:         'rgba(255,255,255,0.15)',
          textTransform: 'uppercase',
          fontFamily:    'monospace',
          pointerEvents: 'none',
          userSelect:    'none',
        }}
      >
        Interactive
      </div>
    </div>
  );
}
