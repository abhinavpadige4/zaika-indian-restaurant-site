// Testimonial Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0 || dots.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds
    let autoSlideTimer;
    
    // Initialize carousel
    function initCarousel() {
        showSlide(0);
        startAutoSlide();
        
        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                resetAutoSlideTimer();
            });
        });
        
        // Pause auto slide when user interacts with carousel
        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', pauseAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Show next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Show previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Start automatic sliding
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Pause automatic sliding
    function pauseAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    // Reset the auto slide timer
    function resetAutoSlideTimer() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            resetAutoSlideTimer();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            resetAutoSlideTimer();
        }
    });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselContainer = document.querySelector('.testimonial-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetAutoSlideTimer();
        }
    }
    
    // Make carousel accessible
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-label', 'Testimonials carousel');
        carousel.setAttribute('aria-roledescription', 'carousel');
    }
    
    // Add ARIA labels to dots
    dots.forEach((dot, index) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
        dot.setAttribute('aria-controls', 'testimonial-carousel');
        if (dot.classList.contains('active')) {
            dot.setAttribute('aria-selected', 'true');
        } else {
            dot.setAttribute('aria-selected', 'false');
        }
        
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
                resetAutoSlideTimer();
            }
        });
    });
});