// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 5 seconds
let slideInterval = setInterval(nextSlide, 4000);

// Pause slideshow when hovering
const slideshow = document.querySelector('.slideshow');
slideshow.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slideshow.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 4000);
});

// Touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
}, {passive: true});

slideshow.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    slideInterval = setInterval(nextSlide, 4000);
}, {passive: true});

function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        nextSlide(); // Swipe left
    }
    if (touchEndX > touchStartX + threshold) {
        showSlide(currentSlide - 1); // Swipe right
    }
}