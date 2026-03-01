export function initNavigation() {
    initMenuToggle();
    initSmoothScrolling();
    initActiveSectionLinks();
    initScrollProgress();
}

function initMenuToggle() {
    const toggleBtn = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#menu-links");
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener("click", () => {
        const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
        toggleBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
        menu.classList.toggle("hidden");
        menu.classList.toggle("flex");
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth >= 768) return;
            toggleBtn.setAttribute("aria-expanded", "false");
            menu.classList.add("hidden");
            menu.classList.remove("flex");
        });
    });
}

function initSmoothScrolling() {
    const nav = document.querySelector("#site-nav");
    const links = document.querySelectorAll('a[href^="#"]');
    if (!links.length) return;

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            const navOffset = nav ? nav.offsetHeight + 12 : 0;
            const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top: targetY, behavior: "smooth" });
        });
    });
}

function initActiveSectionLinks() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-link");
    if (!sections.length || !links.length) return;

    const sectionMap = new Map();
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            sectionMap.set(href.slice(1), link);
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const activeId = entry.target.getAttribute("id");
                if (!activeId) return;
                setActiveLink(sectionMap, activeId);
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0.2
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function setActiveLink(sectionMap, activeId) {
    sectionMap.forEach((link, id) => {
        if (id === activeId) {
            link.classList.add("bg-sunocoBlue", "text-white");
            link.classList.remove("text-slate-700");
        } else {
            link.classList.remove("bg-sunocoBlue", "text-white");
            link.classList.add("text-slate-700");
        }
    });
}

function initScrollProgress() {
    const progressBar = document.querySelector("#scroll-progress");
    if (!progressBar) return;

    const updateProgress = () => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${percent}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
}
