
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
            themeToggle.textContent = body.dataset.theme === 'dark' ? '☀️' : '🌙';
        });

        // Mobile Menu
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Smooth Scrolling & Active Navigation
        const navLinksElements = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinksElements.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active navigation
                navLinksElements.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Scroll Progress Bar
        const progressBar = document.getElementById('progressBar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });

        // Intersection Observer for Section Visibility
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Update active navigation based on visible section
                    const sectionId = entry.target.getAttribute('id');
                    navLinksElements.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Contact Form
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Create mailto link
            const mailtoLink = `mailto:feminaazeezfem@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! Your email client will open to send the message.');
        });

        // Loading Animation
        const loader = document.getElementById('loader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1000);
        });

        // Parallax Effect for Hero Background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero::before');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Typing Animation for Hero Title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing animation when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 150);
                }, 1500);
            }
        });

        // Add hover effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.08)';
            });
        });

        // Add animation delay to skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            // Trigger animation when section becomes visible
            const skillSection = document.getElementById('skills');
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                            tag.style.transition = 'all 0.5s ease';
                        }, index * 100);
                    }
                });
            });
            
            skillObserver.observe(skillSection);
        });

        // Add counter animation for statistics (if you want to add any)
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            const counter = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start);
                
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(counter);
                }
            }, 16);
        }

        // Enhanced scroll reveal animation
        const revealElements = document.querySelectorAll('.timeline-content, .project-card, .skill-category, .education-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            revealObserver.observe(element);
        });

        // Add particle effect to hero background (optional enhancement)
        function createParticles() {
            const hero = document.querySelector('.hero');
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particles';
            particleContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            `;
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: var(--accent);
                    border-radius: 50%;
                    opacity: 0.3;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                `;
                particleContainer.appendChild(particle);
            }
            
            hero.appendChild(particleContainer);
        }

        // Initialize particles after page load
        window.addEventListener('load', () => {
            setTimeout(createParticles, 2000);
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Add focus management for accessibility
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        function trapFocus(element) {
            const focusableContent = element.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }

        // Enhanced error handling for form submission
        function validateForm(formData) {
            const errors = [];
            
            if (!formData.get('name') || formData.get('name').trim().length < 2) {
                errors.push('Name must be at least 2 characters long');
            }
            
            if (!formData.get('email') || !isValidEmail(formData.get('email'))) {
                errors.push('Please enter a valid email address');
            }
            
            if (!formData.get('subject') || formData.get('subject').trim().length < 5) {
                errors.push('Subject must be at least 5 characters long');
            }
            
            if (!formData.get('message') || formData.get('message').trim().length < 10) {
                errors.push('Message must be at least 10 characters long');
            }
            
            return errors;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Update contact form submission with validation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }
            
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Create mailto link
            const mailtoLink = `mailto:feminaazeezfem@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! Your email client will open to send the message.');
        });

        // Add performance optimization
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

        // Debounced scroll event for better performance
        const debouncedScrollHandler = debounce(() => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler);

        // Add page visibility API for better performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations or reduce activity when tab is not visible
                document.body.style.animationPlayState = 'paused';
            } else {
                // Resume animations when tab becomes visible
                document.body.style.animationPlayState = 'running';
            }
        });

        console.log('🚀 Femina Azeez Portfolio - Loaded Successfully!');
 
 