// script.js - Enhanced functionality for personal landing page

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add smooth scrolling
    initSmoothScroll();
    
    // Add analytics tracking (optional)
    initAnalytics();
});

// Animation effects
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Simple analytics - track link clicks
function initAnalytics() {
    document.querySelectorAll('a[data-track]').forEach(link => {
        link.addEventListener('click', function() {
            const linkName = this.getAttribute('data-track');
            console.log(`Link clicked: ${linkName}`);
            // You can add Google Analytics or other tracking here
            // gtag('event', 'click', { 'event_category': 'Link', 'event_label': linkName });
        });
    });
}

// Visitor counter (optional)
async function initVisitorCounter() {
    try {
        // This is a simple counter using a free service
        const response = await fetch('https://api.countapi.xyz/hit/your-domain/visits');
        const data = await response.json();
        document.getElementById('visitor-count').textContent = data.value;
    } catch (error) {
        console.log('Visitor counter not available');
    }
}

// Theme switcher (optional)
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Email copy functionality
function initEmailCopy() {
    const emailElement = document.querySelector('.email-copy');
    if (emailElement) {
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Email copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initSmoothScroll();
    initAnalytics();
    initThemeSwitcher();
    initEmailCopy();
    
    // Uncomment if you want visitor counter
    // initVisitorCounter();
});

// Export functions for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAnimations,
        initSmoothScroll,
        initAnalytics
    };
}
