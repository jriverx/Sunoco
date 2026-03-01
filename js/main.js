import { initImportantCarousel } from "./modules/carousel.js";

function initScrollToTopButton() {
    if (document.querySelector("#scroll-to-top")) return;

    const button = document.createElement("button");
    button.id = "scroll-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = `
        <svg class="scroll-top-progress" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
            <circle class="scroll-top-progress__track" cx="28" cy="28" r="24"></circle>
            <circle class="scroll-top-progress__value" cx="28" cy="28" r="24"></circle>
            <path class="scroll-top-progress__arrow" d="M28 17L18 27H24V39H32V27H38L28 17Z"></path>
        </svg>
    `;
    document.body.appendChild(button);

    const progressCircle = button.querySelector(".scroll-top-progress__value");
    if (!progressCircle) return;

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
        const offset = circumference * (1 - progress);
        progressCircle.style.strokeDashoffset = `${offset}`;
        button.classList.toggle("is-visible", scrollTop > 120);
    };

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
}

document.addEventListener("DOMContentLoaded", () => {
    initImportantCarousel();
    initScrollToTopButton();
});
