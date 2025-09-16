        // Navigation dots functionality
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section');

        // Update active nav dot based on scroll position
        function updateActiveNav() {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    navItems[index].classList.add('active');
                }
            });
        }

        // Smooth scroll to section when nav dot is clicked
        navItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        document.querySelectorAll('.alt-overlay img').forEach(img => {
        img.parentElement.setAttribute('data-alt', img.alt);
        });

        // Update nav on scroll
        window.addEventListener('scroll', updateActiveNav);

        // Enhanced form submission with better UX
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                    Sending...
                </span>
            `;
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '✓ Message Sent!';
                submitBtn.style.background = '#10b981';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });

        // Enhanced reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Stagger animation for blog posts
                    if (entry.target.classList.contains('blog-post')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                        entry.target.style.transitionDelay = `${delay}ms`;
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.blog-expand-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = btn.closest('.blog-post');
                card.classList.toggle('expanded');
            });
        });

        // Observe elements for animation
        document.querySelectorAll('.service, .work-item, .section-title, .section-subtitle, .blog-post').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Enhanced typing effect with cursor
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML = text.substring(0, i + 1) + '<span style="opacity: 1; animation: blink 1s infinite;">|</span>';
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        element.innerHTML = text;
                    }, 1000);
                }
            }
            type();
        }

        // Add blink animation for cursor
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroName = document.querySelector('.hero-name');
            const originalText = heroName.textContent;
            typeWriter(heroName, originalText, 120);
            
            // Hide iframe overlays after a delay to simulate loading
            setTimeout(() => {
                document.querySelectorAll('.blog-iframe-overlay').forEach(overlay => {
                    overlay.style.opacity = '0';
                    overlay.style.pointerEvents = 'none';
                });
            }, 2000);
        });

        // Add smooth hover effects for blog posts
        document.querySelectorAll('.blog-post').forEach(post => {
            post.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            post.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add dynamic nav dot animation on scroll
        let ticking = false;
        function updateNavAnimation() {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            navItems.forEach((item, index) => {
                const dot = item.querySelector('.nav-dot');
                const progress = Math.max(0, Math.min(1, (scrollPercent * navItems.length) - index));
                
                if (progress > 0) {
                    dot.style.background = `linear-gradient(135deg, var(--primary) ${progress * 100}%, var(--border) ${progress * 100}%)`;
                }
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavAnimation);
                ticking = true;
            }
        });
