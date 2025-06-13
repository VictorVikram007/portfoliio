document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation || 'fade-in';
                const delay = element.dataset.delay || '0';

                setTimeout(() => {
                    element.classList.add(animation);
                    element.style.visibility = 'visible';
                }, parseInt(delay));

                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Initialize animations for elements
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        element.style.visibility = 'hidden';
        animationObserver.observe(element);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate progress bars
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    };

    // Animate numbers counting up
    const animateNumbers = () => {
        document.querySelectorAll('.animate-number').forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = parseInt(element.getAttribute('data-duration')) || 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                if (current < target) {
                    current = Math.min(current + increment, target);
                    element.textContent = Math.round(current);
                    requestAnimationFrame(updateNumber);
                }
            };

            updateNumber();
        });
    };

    // Hover animations for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });

    // Page load animations
    const pageLoadAnimations = () => {
        const header = document.querySelector('header');
        const mainContent = document.querySelector('main');

        if (header) header.classList.add('fade-in');
        if (mainContent) {
            setTimeout(() => {
                mainContent.classList.add('slide-up');
            }, 300);
        }
    };

    // Initialize all animations
    pageLoadAnimations();
    animateProgressBars();
    animateNumbers();

    // Reinitialize animations on dynamic content load
    const reinitializeAnimations = () => {
        animateProgressBars();
        animateNumbers();
    };

    // Export for external use
    window.portfolioAnimations = {
        reinitialize: reinitializeAnimations
    };
});