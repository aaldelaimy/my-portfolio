// Animate .motion-* elements on scroll using IntersectionObserver
function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Animate .motion-* elements on scroll
    const motionElements = document.querySelectorAll('.motion-text, .motion-list, .motion-card, .motion-tech, .motion-links, .motion-title, .motion-highlight');
    motionElements.forEach(el => {
        el.style.opacity = '0';
        el.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s var(--animation-timing)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Staggered list items
                if (entry.target.classList.contains('motion-list')) {
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                // Tech stack tags
                if (entry.target.classList.contains('tech-stack')) {
                    const tags = entry.target.querySelectorAll('span');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    motionElements.forEach((el) => observer.observe(el));

    // Project card hover effect (3D tilt) with throttling
    function throttle(fn, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', throttle(function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            card.style.transform = `
                perspective(1000px)
                rotateX(${-yPercent}deg)
                rotateY(${xPercent}deg)
                translateZ(10px)
            `;
        }, 16)); // ~60fps
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Button magnetic effect with throttling
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mousemove', throttle(function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width - 0.5) * 30;
            const yPercent = (y / rect.height - 0.5) * 30;
            button.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
        }, 16));
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Scroll progress bar (debounced)
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', debounce(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.style.opacity = scrollPosition > 50 ? '1' : '0';
    }, 10));

    // Animated background gradient (use transform for composited animation)
    const gradientElement = document.createElement('div');
    gradientElement.className = 'animated-gradient';
    document.body.appendChild(gradientElement);
    let gradientAngle = 0;
    function animateGradient() {
        gradientAngle = (gradientAngle + 1) % 360;
        gradientElement.style.transform = `rotate(${gradientAngle}deg)`;
        gradientElement.style.background = `linear-gradient(90deg, var(--gradient-start), var(--gradient-end))`;
        requestAnimationFrame(animateGradient);
    }
    animateGradient();

    // Navigation active state on scroll (debounced)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY;
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 10));

    // Smooth scrolling for navigation links
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

    // Make sure hero section text is visible immediately
    const heroText = document.querySelector('.hero-content');
    if (heroText) {
        heroText.style.opacity = '1';
        heroText.style.transform = 'none';
    }
});

// Add styles for scroll progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--primary-color);
        z-index: 1000;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
    }
});