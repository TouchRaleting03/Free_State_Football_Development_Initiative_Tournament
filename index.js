document.addEventListener('DOMContentLoaded', function() {
    // Toggle navigation menu on smaller screens
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');

    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Toggle dropdown menu for smaller screens
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function() {
            dropdownMenu.classList.toggle('show');
        });
    }

    // SEO Optimization: Add alt attributes to all images if missing
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
            img.setAttribute('alt', `Image ${index + 1}`);
        }
    });

    // Lazy load images for better performance
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src'); // Remove data-src after loading
                    observer.unobserve(img);
                }
            });
        });
        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // Smooth scroll for anchor links
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const startTime = null;

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });
});