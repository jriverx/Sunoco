import { initNavigation } from "./modules/navigation.js";
import { initRevealAnimations } from "./modules/reveal.js";
import { initCounters } from "./modules/counters.js";
import { initHeroCallMenu } from "./modules/call-menu.js";
import { setCurrentYear } from "./modules/ui.js";

document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    initNavigation();
    initRevealAnimations();
    initCounters();
    initHeroCallMenu();
});
