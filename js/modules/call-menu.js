export function initHeroCallMenu() {
    const toggle = document.querySelector("#hero-call-toggle");
    const menu = document.querySelector("#hero-call-menu");
    const backdrop = document.querySelector("#hero-call-backdrop");
    if (!toggle || !menu) return;

    const callLinks = menu.querySelectorAll('a[href^="tel:"]');

    const closeMenu = () => {
        menu.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        if (backdrop) backdrop.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    };

    const openMenu = () => {
        menu.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
        if (isMobile() && backdrop) {
            backdrop.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        }
    };

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (!menu.contains(target) && !toggle.contains(target)) {
            closeMenu();
        }
    });

    if (backdrop) {
        backdrop.addEventListener("click", closeMenu);
    }

    callLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

function isMobile() {
    return window.matchMedia("(max-width: 639px)").matches;
}
