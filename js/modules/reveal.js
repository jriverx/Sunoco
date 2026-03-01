export function initRevealAnimations() {
    const sections = document.querySelectorAll("[data-reveal]");
    if (!sections.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    sections.forEach((section) => {
        section.classList.add("opacity-0", "translate-y-5", "transition-all", "duration-700");
    });

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.remove("opacity-0", "translate-y-5");
                entry.target.classList.add("opacity-100", "translate-y-0");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => observer.observe(section));
}
