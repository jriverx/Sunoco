export function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
        counters.forEach((counter) => {
            const target = Number(counter.getAttribute("data-counter"));
            const suffix = counter.getAttribute("data-suffix") || "";
            counter.textContent = `${target}${suffix}`;
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                currentObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(counterNode) {
    const target = Number(counterNode.getAttribute("data-counter"));
    const suffix = counterNode.getAttribute("data-suffix") || "";
    if (!Number.isFinite(target)) return;

    const duration = 1200;
    const startTime = performance.now();

    const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = easeOutCubic(progress);
        const value = Math.round(target * eased);
        counterNode.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}
