// Navigation dots functionality
        const navDots = document.querySelectorAll('.nav-dot');
        const sections = document.querySelectorAll('section');

        // Update active nav dot based on scroll position
        function updateActiveNav() {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navDots.forEach(dot => dot.classList.remove('active'));
                    navDots[index].classList.add('active');
                }
            });
        }

        // Smooth scroll to section when nav dot is clicked
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Update nav on scroll
        window.addEventListener('scroll', updateActiveNav);

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation and submission feedback
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });

        // Add smooth reveal animations for elements
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

        // Observe elements for animation
        document.querySelectorAll('.service, .work-item, .section-title, .section-subtitle').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add typing effect for hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroName = document.querySelector('.hero-name');
            const originalText = heroName.textContent;
            typeWriter(heroName, originalText, 150);
        });
