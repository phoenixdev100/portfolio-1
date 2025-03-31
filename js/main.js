// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Menu Toggle
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu').querySelector('div');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
}

menuButton.addEventListener('click', toggleMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && 
        !menuButton.contains(e.target) && 
        !mobileMenu.classList.contains('hidden')) {
        toggleMenu();
    }
});

// Handle mobile theme toggle
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    });
}

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3B82F6' // Blue color matching our theme
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3B82F6',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Here you would typically send the data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Dynamic copyright year
const copyrightYear = document.querySelector('footer p');
if (copyrightYear) {
    copyrightYear.textContent = copyrightYear.textContent.replace('2025', new Date().getFullYear());
}

// Add active state to navigation links based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('text-blue-500');
        link.classList.remove('hover:text-blue-500');
    }
});

// Typing effect for the hero section
const typedText = document.querySelector('.gradient-text');
if (typedText && window.location.pathname.includes('index.html')) {
    const text = typedText.textContent;
    typedText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typedText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

// Typing effect for keywords
const keywords = ['React', 'Node.js', 'Python', 'AWS', 'Machine Learning', 'Cloud Architecture'];
let keywordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingKeywords = document.querySelector('.typing-keywords');

function typeKeyword() {
    const currentKeyword = keywords[keywordIndex];
    
    if (isDeleting) {
        typingKeywords.textContent = currentKeyword.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingKeywords.textContent = currentKeyword.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentKeyword.length) {
        isDeleting = true;
        setTimeout(typeKeyword, 1500); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        keywordIndex = (keywordIndex + 1) % keywords.length;
        setTimeout(typeKeyword, 500); // Wait before typing next word
    } else {
        setTimeout(typeKeyword, isDeleting ? 50 : 100);
    }
}

if (typingKeywords) {
    setTimeout(typeKeyword, 1000);
}

// Console typing effect
const consoleText = document.querySelector('.typing-text');
if (consoleText) {
    const text = consoleText.textContent;
    consoleText.textContent = '';
    let index = 0;
    
    function typeConsole() {
        if (index < text.length) {
            consoleText.textContent += text[index];
            index++;
            setTimeout(typeConsole, 50);
        }
    }
    
    typeConsole();
}

// Project filter functionality
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button state
        filterButtons.forEach(btn => btn.classList.remove('bg-blue-500'));
        button.classList.add('bg-blue-500');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Scroll Progress Indicator
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    // Update progress bar width
    document.querySelector('.progress-bar').style.width = scrolled + '%';
};

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-item');
const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.bg-blue-500');
            const percentage = progressBar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
            progressBar.style.width = percentage;
            observer.unobserve(entry.target);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => skillObserver.observe(bar));

// Animate tech cards on scroll
const techCards = document.querySelectorAll('.tech-card');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-float');
        }
    });
}, observerOptions);

techCards.forEach(card => observer.observe(card));

// GitHub activity counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate GitHub stats when they come into view
const githubStats = document.querySelectorAll('.github-stat');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.querySelector('.text-3xl');
            const endValue = parseInt(target.textContent);
            animateValue(target, 0, endValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

githubStats.forEach(stat => statsObserver.observe(stat));

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    // Update icon
    if (html.classList.contains('dark')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Save preference
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Set initial theme based on preference
if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Initialize Charts
function initializeCharts() {
    // Weekly Coding Activity Chart
    const activityCtx = document.getElementById('activityChart')?.getContext('2d');
    if (activityCtx) {
        new Chart(activityCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Hours Coded',
                    data: [6, 8, 7, 9, 8, 5, 4],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#9CA3AF'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#9CA3AF'
                        }
                    }
                }
            }
        });
    }

    // Skills Distribution Chart
    const skillsCtx = document.getElementById('skillsChart')?.getContext('2d');
    if (skillsCtx) {
        new Chart(skillsCtx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'DevOps', 'Database', 'Mobile', 'AI/ML'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 75, 80, 70, 65],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3B82F6',
                    pointBackgroundColor: '#3B82F6',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3B82F6'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#9CA3AF'
                        },
                        ticks: {
                            color: '#9CA3AF',
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        });
    }

    // Project Categories Chart
    const projectsCtx = document.getElementById('projectsChart')?.getContext('2d');
    if (projectsCtx) {
        new Chart(projectsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Apps', 'Mobile Apps', 'AI/ML', 'DevOps', 'Other'],
                datasets: [{
                    data: [40, 20, 15, 15, 10],
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B',
                        '#EF4444',
                        '#8B5CF6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#9CA3AF',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 100);
    });
}

// Initialize charts when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    animateProgressBars();
});

// Re-initialize charts when they come into view
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initializeCharts();
            chartObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const chartsSection = document.querySelector('.charts-section');
if (chartsSection) {
    chartObserver.observe(chartsSection);
}

// Animate counting numbers
function animateCountingNumbers() {
    const countingNumbers = document.querySelectorAll('.counting-number');
    
    countingNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                number.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target.toLocaleString();
            }
        };
        
        updateNumber();
    });
}

// Initialize counting animation when elements come into view
const countingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCountingNumbers();
            countingObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const metricsSection = document.querySelector('.counting-number')?.closest('.glass');
if (metricsSection) {
    countingObserver.observe(metricsSection);
}

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-timeline');
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

timelineItems.forEach(item => timelineObserver.observe(item));

// Navbar Scroll Behavior
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu?.contains(e.target) && 
        !menuButton?.contains(e.target) && 
        mobileMenu?.classList.contains('show')) {
        toggleMenu();
    }
});

// Update current year in footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput?.value) {
        // Add success message
        const successMessage = document.createElement('div');
        successMessage.className = 'text-green-500 text-sm mt-2';
        successMessage.textContent = 'Thank you for subscribing!';
        newsletterForm.appendChild(successMessage);
        
        // Reset form
        emailInput.value = '';
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu?.classList.contains('show')) {
                mobileMenu.classList.remove('show');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Create particles container if it doesn't exist
    if (!document.getElementById('particles-js')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        document.body.prepend(particlesContainer);
    }

    // Wrap main content if not already wrapped
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'content-wrapper';
    
    // Move all body children except particles-js into wrapper
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
        if (child.id !== 'particles-js') {
            contentWrapper.appendChild(child);
        }
    });
    
    document.body.appendChild(contentWrapper);
});
