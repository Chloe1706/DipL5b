// ===== CONFIG =====
const CONFIG = {
    // === ANIMATION PROPERTIES ===
    blurMax: 12, // Subtle blur (less is more for professional look)
    scaleIn: 0.05, // Minimal scale change (refined)
    scaleOut: 0.08, // Minimal scale change (refined)
    rotationMax: 1.5, // Very subtle rotation (sophisticated, not distracting)
    saturationMin: 0.75, // Keeps colors vibrant (not desaturated)

    // === CAPTION ANIMATION ===
    captionDelay: 0.3,
    captionDuration: 0.7,
    captionFadeStrength: 1.2, // Subtle fade
    captionSlide: 20, // Minimal slide (elegant, not flashy)
    captionRotate: 2, // Very subtle rotation

    // === EASING FUNCTIONS ===
    // Options: 'applyEasing', 'easeInOutExpo', 'easeInOutQuart'
    imageEasing: 'easeInOutExpo', // Silky smooth for images
    captionEasing: 'easeInOutExpo', // Consistent smoothness
    blurEasing: 'easeInOutCubic', // Natural blur changes

    // === EDGE SOFTENING (THE STAR) ===
    // Options: 'linearGradient', 'radialGradient', 'opacity', 'dropShadow', 'borderRadius', 'combined'
    edgeSofteningMethod: 'combined', // Gradient + subtle radius = professional
    featherAmount: 20, // Balanced softness

    // === TIER 1: BODY CONTENT STAGGER ===
    bodyContentSlide: 40, // How far to slide up (pixels)
    bodyContentEasing: 'easeOutQuad', // Snappy entrance

    // === TIER 1: QUOTE PARALLAX ===
    quoteScaleMax: 1.08, // 8% scale up
    quoteSaturationMin: 0.85, // Subtle color shift
    quoteEasing: 'easeInOutExpo', // Smooth parallax

    // === TIER 2: IMAGE CARD CASCADE ===
    cardSlide: 50, // How far to slide from side (pixels)
    cardRotation: 2, // Subtle rotation on entry
    cardEasing: 'easeOutQuad', // Snappy entrance

    // === TIER 2: COLUMN CONTENT REVEAL ===
    columnEasing: 'easeOutQuad', // Smooth reveal
};

// ===== SELECTORS =====
const wrapper = document.querySelector('.transition-wrapper');
const img1 = document.querySelector('.img-1');
const img2 = document.querySelector('.img-2');
const caption1 = document.querySelector('.caption-1');
const caption2 = document.querySelector('.caption-2');

// Tier 1 selectors
const bodyContents = document.querySelectorAll('.body-content');
const quoteSection = document.querySelector('.quote-section');

// Tier 2 selectors
const imageCards = document.querySelectorAll('.image-card');
const columnTexts = document.querySelectorAll('.column-text');

// ===== ERROR HANDLING =====
const elements = { wrapper, img1, img2, caption1, caption2 };
const isReady = Object.values(elements).every((el) => el !== null);

if (!isReady) {
    console.warn(
        'IntersectionObserver: Some required elements are missing',
        elements
    );
}

// ===== EASING FUNCTIONS =====
// Primary easing for image transitions
function applyEasing(progress) {
    // Custom cinematic curve with more pronounced hold in middle
    if (progress < 0.15) {
        // Very slow start (like a camera focus pull)
        return progress * progress * 0.5;
    } else if (progress < 0.85) {
        // Smooth middle acceleration
        const middle = (progress - 0.15) / 0.7;
        return 0.01 + middle * middle * (3 - 2 * middle) * 0.98;
    } else {
        // Slow settle at the end
        const end = (progress - 0.85) / 0.15;
        return 0.99 + (end * end) * 0.01;
    }
}

// Smooth easing for caption animations (ease-in-out cubic)
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Elastic easing for more organic feel
function easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
}

// Quartic easing for dramatic emphasis
function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

// Exponential for very smooth cinematic transitions
function easeInOutExpo(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

// Helper to get easing function by name
function getEasing(easingName) {
    const easings = {
        applyEasing,
        easeInOutExpo,
        easeInOutQuart,
        easeOutQuad,
        easeInOutCubic,
    };
    return easings[easingName] || applyEasing;
}

// Apply edge softening based on selected method
function applySoftEdge(img, reveal, imageProgress) {
    const method = CONFIG.edgeSofteningMethod;
    const feather = CONFIG.featherAmount;

    switch (method) {
        case 'linearGradient': {
            // Soft linear gradient from top
            const softStart = Math.max(0, reveal - feather);
            const softEnd = Math.min(100, reveal + feather);
            img.style.maskImage = `linear-gradient(to bottom, transparent 0%, transparent ${softStart}%, black ${softEnd}%, black 100%)`;
            img.style.webkitMaskImage = `linear-gradient(to bottom, transparent 0%, transparent ${softStart}%, black ${softEnd}%, black 100%)`;
            break;
        }
        case 'radialGradient': {
            // Soft radial glow (more organic)
            img.style.maskImage = `radial-gradient(ellipse 100% ${feather}px at center bottom, transparent 0%, black ${feather}px, black 100%)`;
            img.style.webkitMaskImage = `radial-gradient(ellipse 100% ${feather}px at center bottom, transparent 0%, black ${feather}px, black 100%)`;
            break;
        }
        case 'opacity': {
            // Simple opacity fade (performance friendly)
            const edgeOpacity = Math.min(1, imageProgress * 2.5);
            img.style.opacity = edgeOpacity;
            break;
        }
        case 'dropShadow': {
            // Soft shadow at edge with gradient
            const softStart = Math.max(0, reveal - feather);
            const softEnd = Math.min(100, reveal + feather);
            img.style.maskImage = `linear-gradient(to bottom, transparent 0%, transparent ${softStart}%, black ${softEnd}%, black 100%)`;
            img.style.webkitMaskImage = `linear-gradient(to bottom, transparent 0%, transparent ${softStart}%, black ${softEnd}%, black 100%)`;
            img.style.boxShadow = `inset 0 -20px 30px rgba(0,0,0,0.15)`;
            break;
        }
        case 'borderRadius': {
            // Animating border radius for sleek effect
            const radius = (1 - imageProgress) * 30;
            img.style.borderRadius = `${radius}px`;
            break;
        }
        case 'combined': {
            // Combine multiple techniques for ultimate smoothness
            const softStart = Math.max(0, reveal - feather);
            const softEnd = Math.min(100, reveal + feather);
            img.style.maskImage = `linear-gradient(to bottom, transparent 0%, transparent ${softStart}%, black ${softEnd}%, black 100%)`;
            img.style.webkitMaskImage = `linear-gradient(to bottom, transparent 0%, transparent ${softStart}%, black ${softEnd}%, black 100%)`;
            const radius = (1 - imageProgress) * 15;
            img.style.borderRadius = `${radius}px`;
            break;
        }
        default:
            break;
    }
}

// ===== TIER 1: BODY CONTENT STAGGER SETUP =====
const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
};

// Create observer for body content sections
const bodyContentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            bodyContentObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all body content sections with stagger delay
bodyContents.forEach((section, index) => {
    // Set CSS custom property for stagger delay
    section.style.setProperty('--stagger-index', index);
    bodyContentObserver.observe(section);
});

// ===== TIER 1: QUOTE PARALLAX SETUP =====
const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('quote-in-view');
            quoteObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

if (quoteSection) {
    quoteObserver.observe(quoteSection);
}

// ===== TIER 2: IMAGE CARD CASCADE SETUP =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-in-view');
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

imageCards.forEach((card, index) => {
    // Set CSS custom property for cascade delay (alternating left/right)
    card.style.setProperty('--card-index', index);
    card.style.setProperty('--card-direction', index % 2 === 0 ? '1' : '-1'); // 1 for left, -1 for right
    cardObserver.observe(card);
});

// ===== TIER 2: COLUMN CONTENT REVEAL SETUP =====
const columnObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('column-in-view');
            columnObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
});

columnTexts.forEach((column, index) => {
    // Set CSS custom property for reveal delay
    column.style.setProperty('--column-index', index);
    columnObserver.observe(column);
});

// ===== FEATURED VIDEO PLAY/PAUSE ON VISIBILITY =====
const featuredVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.featured video').forEach((video) => {
    featuredVideoObserver.observe(video);
});

// ===== TIER 2: SOURCE ITEM STAGGER SETUP =====
const sourceItems = document.querySelectorAll('.source-item');

const sourceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('source-in-view');
            sourceObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
});

sourceItems.forEach((item, index) => {
    item.style.setProperty('--source-index', index);
    sourceObserver.observe(item);
});

// ===== TRANSITION WRAPPER FADE-IN SETUP =====
const transitionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

if (wrapper) {
    transitionObserver.observe(wrapper);
}

// ===== MAIN UPDATE FUNCTION =====
function updateTransition() {
    if (!isReady) return;

    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate scroll progress (0–1)
    let progress = -rect.top / (rect.height - windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Apply different easing curves for different properties
    const imageEasing = getEasing(CONFIG.imageEasing);
    const captionEasing = getEasing(CONFIG.captionEasing);
    const blurEasing = getEasing(CONFIG.blurEasing);

    const easedImageProgress = imageEasing(progress);
    const blurProgress = blurEasing(progress);

    // Separate timelines for images and captions
    const imageProgress = easedImageProgress;
    const captionEasingFn = getEasing(CONFIG.captionEasing);
    const rawCaptionProgress = Math.max(
        0,
        Math.min(1, (progress - CONFIG.captionDelay) / CONFIG.captionDuration)
    );
    const captionProgress = captionEasingFn(rawCaptionProgress);

    // === IMAGE 2 (revealing) ===
    const reveal = (1 - imageProgress) * 100;
    img2.style.clipPath = `inset(${reveal}% 0 0 0)`;

    // Use blur easing for more dramatic blur changes
    const blurIn = Math.pow(1 - blurProgress, 2) * CONFIG.blurMax;
    const scaleInValue = 1 + (1 - imageProgress) * CONFIG.scaleIn;
    const rotateIn = (1 - imageProgress) * CONFIG.rotationMax;
    const saturationIn = CONFIG.saturationMin + imageProgress * (1 - CONFIG.saturationMin);

    img2.style.filter = `blur(${blurIn}px) saturate(${saturationIn})`;
    img2.style.transform = `scale(${scaleInValue}) rotate(${rotateIn}deg)`;

    // === IMAGE 1 (leaving) ===
    const blurOut = Math.pow(blurProgress, 2) * CONFIG.blurMax;
    const scaleOutValue = 1 + imageProgress * CONFIG.scaleOut;
    const saturationOut = 1 - imageProgress * (1 - CONFIG.saturationMin);

    img1.style.filter = `blur(${blurOut}px) saturate(${saturationOut})`;
    img1.style.transform = `scale(${scaleOutValue})`;

    // === CAPTIONS ===
    const easedCaptionProgress = easeInOutCubic(captionProgress);

    const cap1Opacity = 1 - easedCaptionProgress * CONFIG.captionFadeStrength;
    caption1.style.opacity = Math.max(0, cap1Opacity);
    caption1.style.transform = `translateY(${easedCaptionProgress * CONFIG.captionSlide}px) rotate(${easedCaptionProgress * CONFIG.captionRotate}deg)`;

    const cap2Opacity = (easedCaptionProgress - 0.3) * CONFIG.captionFadeStrength;
    caption2.style.opacity = Math.max(0, Math.min(1, cap2Opacity));
    caption2.style.transform = `translateY(${(1 - easedCaptionProgress) * CONFIG.captionSlide}px) rotate(${(1 - easedCaptionProgress) * CONFIG.captionRotate}deg)`;
}

// ===== OPTIMIZED SCROLL HANDLER =====
if (isReady) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTransition();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateTransition();
}

// ===== SECTION CHILDREN STAGGER =====
const sectionChildObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            sectionChildObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('main section').forEach((section) => {
    const children = section.querySelectorAll(':scope > h2, :scope > h3, :scope > p, :scope > .media');
    children.forEach((el, index) => {
        el.style.setProperty('--item-index', index);
        sectionChildObserver.observe(el);
    });
});



