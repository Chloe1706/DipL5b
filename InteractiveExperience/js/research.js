//   <!-- Timeline read-more toggle (DeveloperJournal pattern) -->

document.querySelectorAll('.tl-read-more').forEach(btn => {
    btn.addEventListener('click', () => {
        const textEl = btn.previousElementSibling;
        const isOpen = textEl.classList.toggle('is-open');
        btn.textContent = isOpen ? 'Read less' : 'Read more';
    });
});


//   <!-- Key-points stagger reveal -->

(function () {
    const cards = document.querySelectorAll('.timeline-section .timeline');
    if (!cards.length) return;
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const i = Array.from(cards).indexOf(card);
            setTimeout(() => card.classList.add('kp-visible'), i * 180);
            observer.unobserve(card);
        });
    }, { threshold: 0.15 });
    cards.forEach(c => obs.observe(c));
})();


//   <!-- Portrait video carousel -->

document.querySelectorAll('.portrait-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    let current = 0;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        // pause all, play current
        slides.forEach((s, i) => {
            const v = s.querySelector('video');
            if (!v) return;
            i === current ? v.play() : v.pause();
        });
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    // autoplay first slide on load
    goTo(0);
});


//   <!-- Animated grid canvas background -->

(function () {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const CELL = 55;
    const SPEED = 0.4;
    const BG = '#1a1a1a';
    const LINE = '#2d2d3f';

    let offset = 0;
    let raf = null;

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 1;
    }

    function draw() {
        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, W, H);
        ctx.beginPath();
        const ox = offset % CELL;
        for (let x = ox - CELL; x < W + CELL; x += CELL) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
        }
        for (let y = ox - CELL; y < H + CELL; y += CELL) {
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
        }
        ctx.stroke();
        offset += SPEED;
        raf = requestAnimationFrame(draw);
    }

    function start() { if (!raf) raf = requestAnimationFrame(draw); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    resize();
    window.addEventListener('resize', () => { stop(); resize(); start(); });

    new IntersectionObserver(entries => {
        entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0 }).observe(canvas.parentElement);
})();


//   <!-- Mind map diagram -->

(function () {
    const svg = document.getElementById('mindmapSvg');
    if (!svg) return;

    const W = 1100, H = 680;
    const cx = W / 2, cy = H / 2;

    // ── Edit nodes here ──────────────────────────────────────────
    const centre = 'Interactive\nExperience';

    const branches = [
        {
            label: 'Programmes',
            angle: -90,
            color: '#E6E27E',
            children: ['MadMapper', 'Ableton Live', 'TouchDesigner'],
        },
        {
            label: 'Material',
            angle: -18,
            color: '#C4C5BA',
            children: ['Foam', 'Plastics', 'Acrylic Sheets', 'Fabrics'],
        },
        {
            label: 'Audience',
            angle: 54,
            color: '#a8c4d4',
            children: ['Movement', 'Participation', 'Accessibility'],
        },
        {
            label: 'Feeling',
            angle: 126,
            color: '#d4a8b0',
            children: ['Intuitive', 'Medatative', 'Satisfying'],
        },
        {
            label: 'Composition',
            angle: 198,
            color: '#b0d4a8',
            children: ['Structure', 'Moving', 'Organic', 'Garden/Zen', 'Draped Fabric'],
        },
    ];
    // ─────────────────────────────────────────────────────────────

    const ns = 'http://www.w3.org/2000/svg';

    function el(tag, attrs) {
        const e = document.createElementNS(ns, tag);
        for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
        return e;
    }

    function polar(bx, by, angleDeg, r) {
        const a = (angleDeg * Math.PI) / 180;
        return { x: bx + r * Math.cos(a), y: by + r * Math.sin(a) };
    }

    function addText(parent, x, y, lines, opts = {}) {
        const t = el('text', {
            x, y,
            'text-anchor': opts.anchor || 'middle',
            'dominant-baseline': 'central',
            fill: opts.fill || '#fff',
            'font-family': 'Poppins, sans-serif',
            'font-size': opts.size || 12,
            'font-weight': opts.weight || 400,
            'letter-spacing': opts.spacing || 0,
        });
        const lh = (opts.size || 12) * 1.4;
        const offset = -(lines.length - 1) * lh / 2;
        lines.forEach((line, i) => {
            const ts = el('tspan', { x, dy: i === 0 ? offset : lh });
            ts.textContent = line;
            t.appendChild(ts);
        });
        parent.appendChild(t);
    }

    // Returns a <g> that fades + rises in when .mm-reveal is added
    function fadeGroup(delayMs) {
        const g = el('g', {});
        g.style.cssText = [
            'opacity:0',
            'transform:translateY(8px)',
            'transform-box:fill-box',
            `transition:opacity 0.55s ease ${delayMs}ms, transform 0.55s ease ${delayMs}ms`,
            'will-change:opacity,transform',
        ].join(';');
        return g;
    }

    // Layers: connections paint behind nodes
    const connLayer = el('g', {});
    const nodeLayer = el('g', {});
    svg.appendChild(connLayer);
    svg.appendChild(nodeLayer);

    // Registry for IntersectionObserver to trigger
    const nodeGroups = [];   // { g } — fade + rise
    const lineElements = []; // { el, delay } — stroke-dashoffset draw-on

    function registerLine(lineEl, delayMs) {
        // Compute length in SVG user units
        let len;
        if (lineEl.tagName === 'line') {
            const dx = +lineEl.getAttribute('x2') - +lineEl.getAttribute('x1');
            const dy = +lineEl.getAttribute('y2') - +lineEl.getAttribute('y1');
            len = Math.hypot(dx, dy);
        } else {
            len = lineEl.getTotalLength ? lineEl.getTotalLength() : 300;
        }
        lineEl.setAttribute('stroke-dasharray', len);
        lineEl.setAttribute('stroke-dashoffset', len);
        lineEl.style.transition = `stroke-dashoffset 0.65s ease ${delayMs}ms`;
        lineElements.push({ el: lineEl, delay: delayMs });
    }

    // ── Centre node (wave 0) ──
    const centreG = fadeGroup(0);
    const centreRx = 82, centreRy = 36;
    centreG.appendChild(el('rect', {
        x: cx - centreRx, y: cy - centreRy,
        width: centreRx * 2, height: centreRy * 2,
        rx: centreRy, ry: centreRy,
        fill: '#E6E27E', stroke: 'none',
    }));
    addText(centreG, cx, cy, centre.split('\n'), { fill: '#1a1a1a', size: 15, weight: 700 });
    nodeLayer.appendChild(centreG);
    nodeGroups.push(centreG);

    const primaryR = 200;
    const childR = 95;

    branches.forEach((branch, bi) => {
        const p = polar(cx, cy, branch.angle, primaryR);
        const mid = polar(cx, cy, branch.angle, primaryR / 2);
        const primaryDelay = 200 + bi * 130;

        // Primary connection line (draw-on, slightly before node appears)
        const pathEl = el('path', {
            d: `M ${cx} ${cy} Q ${mid.x} ${mid.y} ${p.x} ${p.y}`,
            stroke: branch.color,
            'stroke-width': 1.5,
            'stroke-opacity': 0.55,
            fill: 'none',
        });
        connLayer.appendChild(pathEl);
        registerLine(pathEl, primaryDelay - 80);

        // Primary node (wave 1 — staggered per branch)
        const primG = fadeGroup(primaryDelay);
        primG.appendChild(el('circle', {
            cx: p.x, cy: p.y, r: 38,
            fill: 'rgba(255,255,255,0.05)',
            stroke: branch.color,
            'stroke-width': 1.5,
        }));
        addText(primG, p.x, p.y, branch.label.split(' '), { fill: branch.color, size: 11, weight: 600 });
        nodeLayer.appendChild(primG);
        nodeGroups.push(primG);

        // Children (wave 2 — further staggered)
        const nChildren = branch.children.length;
        branch.children.forEach((child, ci) => {
            const spread = Math.min(50, 120 / nChildren);
            const childAngle = branch.angle - (spread * (nChildren - 1)) / 2 + ci * spread;
            const c = polar(p.x, p.y, childAngle, childR);
            const childDelay = primaryDelay + 220 + ci * 75;

            // Child connector
            const cLine = el('line', {
                x1: p.x, y1: p.y, x2: c.x, y2: c.y,
                stroke: branch.color,
                'stroke-width': 1,
                'stroke-opacity': 0.3,
            });
            connLayer.appendChild(cLine);
            registerLine(cLine, childDelay - 60);

            // Child pill node
            const childG = fadeGroup(childDelay);
            const tw = child.length * 6 + 18;
            const th = 22;
            childG.appendChild(el('rect', {
                x: c.x - tw / 2, y: c.y - th / 2,
                width: tw, height: th,
                rx: th / 2, ry: th / 2,
                fill: 'rgba(255,255,255,0.06)',
                stroke: branch.color,
                'stroke-width': 0.8,
                'stroke-opacity': 0.45,
            }));
            addText(childG, c.x, c.y, [child], { fill: 'rgba(255,255,255,0.75)', size: 10, weight: 300 });
            nodeLayer.appendChild(childG);
            nodeGroups.push(childG);
        });
    });

    // ── IntersectionObserver: fire once when section scrolls into view ──
    const section = svg.closest('.mindmap-section');
    if (!section) return;

    let fired = false;
    new IntersectionObserver((entries, obs) => {
        if (fired || !entries[0].isIntersecting) return;
        fired = true;
        obs.disconnect();

        // Reveal node groups (fade + rise)
        nodeGroups.forEach(g => {
            g.style.opacity = '1';
            g.style.transform = 'translateY(0)';
        });

        // Draw on connecting lines
        lineElements.forEach(({ el }) => {
            el.setAttribute('stroke-dashoffset', '0');
        });
    }, { threshold: 0.15 }).observe(section);
})();

