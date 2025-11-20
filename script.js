// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cookieNotice = document.getElementById('cookie-notice');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const fabContainer = document.querySelector('.fab-container');

// Cookie Notice
function checkCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieNotice.classList.remove('show');
}

if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', acceptCookies);
}

checkCookieConsent();

// Sticky Navigation
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .brand-card, .service-card, .gallery-item, .product-category').forEach(el => {
    observer.observe(el);
});

// Contact Form Validation and Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showFormMessage('Proszę wypełnić wszystkie wymagane pola.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Proszę podać prawidłowy adres email.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showFormMessage('Wysyłanie wiadomości...', 'success');
        
        // In a real application, you would send the data to a server here
        setTimeout(() => {
            showFormMessage('Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą wkrótce.', 'success');
            contactForm.reset();
        }, 1000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Hide/Show Floating Action Buttons on Scroll
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (fabContainer) {
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 300) {
            // Scrolling down
            fabContainer.style.opacity = '0';
            fabContainer.style.transform = 'translateY(20px)';
        } else {
            // Scrolling up
            fabContainer.style.opacity = '1';
            fabContainer.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Initialize FAB container styles
if (fabContainer) {
    fabContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 9) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9) + ' ' + value.slice(9, 11);
            }
        }
        e.target.value = value;
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Lazy Loading for Images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }
});

// Console message for developers
console.log('%cLanda Website', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cOficjalny dystrybutor Novol Professional i Novol Industria', 'color: #666; font-size: 12px;');

