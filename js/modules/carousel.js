export function initImportantCarousel() {
    const slides = Array.from(document.querySelectorAll(".slide"));
    const prevBtn = document.querySelector("#carousel-prev");
    const nextBtn = document.querySelector("#carousel-next");
    if (!slides.length || !prevBtn || !nextBtn) return;

    let current = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle("hidden", i !== index);
            slide.classList.toggle("block", i === index);
            slide.classList.toggle("active", i === index);
        });
    };

    const goPrev = () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    };

    const goNext = () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    };

    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);

    showSlide(current);
    setInterval(goNext, 4500);
}
