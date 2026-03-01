export function setCurrentYear() {
    const yearNode = document.querySelector("#year");
    if (!yearNode) return;
    yearNode.textContent = String(new Date().getFullYear());
}
