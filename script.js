let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const slider = document.querySelector(".slider");
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    updateActiveDot();
}

function changeSlide(step) {
    showSlide(currentIndex + step);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function updateActiveDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.remove("active");
        if (index === currentIndex) {
            dot.classList.add("active");
        }
    });
}

function setSlideFromDot(index) {
    showSlide(index);
}

// Start the automatic slider movement
startAutoSlide();
