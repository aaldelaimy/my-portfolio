// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize animations
    const motionElements = document.querySelectorAll('.motion-text, .motion-list, .motion-card, .motion-tech, .motion-links, .motion-title, .motion-highlight');
    
    // Set initial states
    motionElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s var(--animation-timing)';
    });

    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Handle staggered list items
                if (entry.target.classList.contains('motion-list')) {
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }

                // Add special animation for tech stack items
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

    // Observe all motion elements
    motionElements.forEach((el) => {
        observer.observe(el);
    });

    // Enhanced hover effects and interactions
    const projectCards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.cta-button');

    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
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

            card.style.background = `
                linear-gradient(
                    ${Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) + 90}deg,
                    var(--card-hover),
                    var(--card-bg)
                )
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.background = 'var(--card-bg)';
        });
    });

    // Button magnetic effect
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 30;
            const yPercent = (y / rect.height - 0.5) * 30;

            button.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Smooth scrolling with progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / documentHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
        progressBar.style.opacity = scrollPosition > 50 ? '1' : '0';
    });

    // Animated background gradient
    const gradientElement = document.createElement('div');
    gradientElement.className = 'animated-gradient';
    document.body.appendChild(gradientElement);

    let gradientAngle = 0;
    function animateGradient() {
        gradientAngle = (gradientAngle + 1) % 360;
        gradientElement.style.background = `
            linear-gradient(
                ${gradientAngle}deg,
                var(--gradient-start),
                var(--gradient-end)
            )
        `;
        requestAnimationFrame(animateGradient);
    }
    animateGradient();

    // Add active states to navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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
    });

    // Handle hover animations
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = `translateY(${getComputedStyle(document.documentElement).getPropertyValue('--hover-translate')}) scale(${getComputedStyle(document.documentElement).getPropertyValue('--hover-scale')})`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Handle button hover effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Handle tech stack hover effects
    const techItems = document.querySelectorAll('.motion-tech span');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Handle social link hover effects
    const socialLinks = document.querySelectorAll('.motion-social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

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