// ========================================
// ROCK CITY - BORN TO BLEED STYLE
// JavaScript functionality - Fixed and Optimized
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoadingScreen();
    initBackgroundMusic();
    initContactFeatures();
    initScrollAnimations();
    initInteractiveEffects();
    initVideoPlayback(); // Fix video playback issues
});

// ========================================
// LOADING SCREEN
// ========================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderBar = document.querySelector('.loader-bar');

    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        loaderBar.style.width = progress + '%';
    }, 100);
}

// ========================================
// BACKGROUND MUSIC WITH AUTOPLAY FALLBACK
// ========================================
function initBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');

    // Attempt autoplay
    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay blocked, waiting for user interaction');
            // Play on first user interaction
            const playOnInteraction = () => {
                backgroundMusic.play();
                document.body.removeEventListener('click', playOnInteraction);
                document.body.removeEventListener('touchstart', playOnInteraction);
                document.body.removeEventListener('keydown', playOnInteraction);
            };

            document.body.addEventListener('click', playOnInteraction);
            document.body.addEventListener('touchstart', playOnInteraction);
            document.body.addEventListener('keydown', playOnInteraction);
        });
    }

    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            musicToggle.textContent = '🔊';
        } else {
            backgroundMusic.muted = true;
            musicToggle.textContent = '🔇';
        }
    });
}

// ========================================
// VIDEO PLAYBACK FIXES (RESPONSIVE)
// ========================================
function initVideoPlayback() {
    // Handle background video (kornmovil.mp4 / kornmovil.mp4)
    const backgroundVideo = document.querySelector('.background-video');
    if (backgroundVideo) {
        backgroundVideo.play().catch(error => {
            console.log('Background video autoplay failed:', error);
            const playOnInteraction = () => {
                backgroundVideo.play().catch(e => console.log('Background video manual play failed:', e));
                document.body.removeEventListener('click', playOnInteraction);
                document.body.removeEventListener('touchstart', playOnInteraction);
            };
            document.body.addEventListener('click', playOnInteraction);
            document.body.addEventListener('touchstart', playOnInteraction);
        });

        backgroundVideo.addEventListener('error', function() {
            console.log('Background video failed to load');
            this.parentElement.style.background = 'linear-gradient(45deg, #000, #333)';
        });
    }

    // Handle skull video (kornmovil.mp4 / kornmovil.mp4)
    const skullVideo = document.querySelector('.skull-video');
    if (skullVideo) {
        skullVideo.play().catch(error => {
            console.log('Skull video autoplay failed:', error);
            const playOnInteraction = () => {
                skullVideo.play().catch(e => console.log('Skull video manual play failed:', e));
                document.body.removeEventListener('click', playOnInteraction);
                document.body.removeEventListener('touchstart', playOnInteraction);
            };
            document.body.addEventListener('click', playOnInteraction);
            document.body.addEventListener('touchstart', playOnInteraction);
        });

        skullVideo.addEventListener('error', function() {
            console.log('Skull video failed to load');
            this.parentElement.style.background = 'linear-gradient(45deg, #000, #333)';
        });
    }

    // Ensure responsive video loading
    function handleSourceChange() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Force video to load the correct source based on screen size
            const sources = video.querySelectorAll('source');
            sources.forEach(source => {
                if (source.media && window.matchMedia(source.media).matches) {
                    if (video.currentSrc !== source.src) {
                        video.src = source.src;
                        video.load();
                    }
                }
            });
        });
    }

    // Handle screen resize for responsive videos
    window.addEventListener('resize', handleSourceChange);
    handleSourceChange(); // Initial load
}

// ========================================
// CONTACT FEATURES
// ========================================
function initContactFeatures() {
    // vCard generation for "Agregar Contacto" button
    document.getElementById('contact-btn').addEventListener('click', function() {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Rock City Gear
ORG:Rock City Rock Shop
TEL:+527774808222
URL:https://www.facebook.com/profile.php?id=61582657080200
URL:https://www.instagram.com/luisfernandomsnver
URL:https://www.tiktok.com/@rockcitygear
ADR:;;México;;México
NOTE:Born to Bleed Style
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'RockCity.vcf';
        link.click();
        URL.revokeObjectURL(url);
    });
}

// ========================================
// SCROLL ANIMATIONS (FIXED)
// ========================================
function initScrollAnimations() {
    // Use requestAnimationFrame for smooth parallax
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-title');
        const buttonContainer = document.querySelector('.button-container');
        const socialButtons = document.querySelector('.social-buttons');
        const actionButtons = document.querySelector('.action-buttons');

        if (hero) {
            // Hero background parallax
            const heroRate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${heroRate}px, 0)`;
        }

        if (heroTitle) {
            // Title text parallax (slower)
            const titleRate = scrolled * -0.2;
            heroTitle.style.transform = `translate3d(0, ${titleRate}px, 0)`;
        }

        if (buttonContainer) {
            // Button container parallax
            const buttonRate = scrolled * -0.1;
            buttonContainer.style.transform = `translate3d(0, ${buttonRate}px, 0)`;
        }

        if (socialButtons) {
            // Social buttons container parallax
            const socialRate = scrolled * -0.15;
            socialButtons.style.transform = `translate3d(0, ${socialRate}px, 0)`;
        }

        if (actionButtons) {
            // Action buttons container parallax
            const actionRate = scrolled * -0.12;
            actionButtons.style.transform = `translate3d(0, ${actionRate}px, 0)`;
        }

        // Intersection Observer for button animations (works on mobile too)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add flip-flap animation class with slight delay for mobile
                    setTimeout(() => {
                        entry.target.classList.add('flip-flap-animate');
                    }, 100);
                }
            });
        }, {
            threshold: 0.1, // Lower threshold for mobile
            rootMargin: '50px' // Trigger earlier on mobile
        });

        // Observe all buttons for flip-flap animation
        document.querySelectorAll('.social-btn, .action-btn').forEach((btn, index) => {
            // Add delay based on index for wave effect
            btn.style.animationDelay = `${index * 0.1}s`;
            observer.observe(btn);
        });

        // Title section observer
        const titleSection = document.querySelector('.hero-title-section');
        if (titleSection) {
            const titleObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const titleElements = entry.target.querySelectorAll('.title-main, .title-sub, .title-tagline');
                        titleElements.forEach((element, index) => {
                            setTimeout(() => {
                                element.style.transform = 'translate3d(0, 0, 0)';
                                element.style.opacity = '1';
                            }, index * 200);
                        });
                    }
                });
            }, { threshold: 0.3 });
            titleObserver.observe(titleSection);
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Throttled scroll listener for better performance
    window.addEventListener('scroll', requestTick);

    // Initial button states with hardware acceleration
    const allBtns = document.querySelectorAll('.social-btn, .action-btn');
    allBtns.forEach((btn, index) => {
        // Set initial state for animations - ensure buttons are always visible and clickable
        btn.style.transform = 'translate3d(0, 0, 0)';
        btn.style.opacity = '1';
        btn.style.transformOrigin = 'center center';
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.style.willChange = 'transform, opacity';
        btn.style.pointerEvents = 'auto';
        btn.style.position = 'relative';
        btn.style.zIndex = '10';
        btn.style.visibility = 'visible';
        btn.style.display = 'flex';

        // Ensure buttons work on mobile
        if ('ontouchstart' in window) {
            btn.style.minHeight = '48px';
            btn.style.touchAction = 'manipulation';
        }
    });

    // Initial title states with hardware acceleration
    const titleElements = document.querySelectorAll('.title-main, .title-sub, .title-tagline');
    titleElements.forEach(element => {
        element.style.transform = 'translate3d(0, 30px, 0)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.willChange = 'transform, opacity';
    });
}

// ========================================
// INTERACTIVE EFFECTS (SIMPLIFIED)
// ========================================
function initInteractiveEffects() {
    // Simple hover effects for social buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(255,0,0,0.5)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
    });

    // Simple hover effects for action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.filter = 'brightness(1.1)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.filter = 'brightness(1)';
        });
    });

    // Simple click effects
    document.querySelectorAll('.social-btn, .action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Simple click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Ensure links work properly
            if (this.tagName === 'A' && this.href) {
                console.log('Link clicked:', this.href);
            }
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Error handling for media loading
function handleMediaError(mediaElement, fallback) {
    mediaElement.addEventListener('error', function() {
        console.log('Media failed to load:', this.src);
        if (fallback) fallback();
    });
}

// Performance monitoring
function logPerformance() {
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
}

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// ========================================
// CSS FOR RIPPLE EFFECT
// ========================================
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

console.log('🤘 Rock City - Born to Bleed Style - Loaded Successfully!');

// ========================================
// BUTTON FUNCTIONALITY TEST
// ========================================
function testButtonFunctionality() {
    // Test all social and action buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    const actionBtns = document.querySelectorAll('.action-btn');

    console.log(`Found ${socialBtns.length} social buttons`);
    console.log(`Found ${actionBtns.length} action buttons`);

    // Add click event listeners with logging
    socialBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            console.log(`Social button ${index} clicked:`, btn.href || btn.textContent);
        });
    });

    actionBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            console.log(`Action button ${index} clicked:`, btn.href || btn.textContent);
        });
    });
}

// Test button functionality after a short delay
setTimeout(testButtonFunctionality, 1000);

// ========================================
// ENSURE BUTTONS ARE ALWAYS VISIBLE
// ========================================
function ensureButtonVisibility() {
    // Force all buttons to be visible
    const allBtns = document.querySelectorAll('.social-btn, .action-btn');
    allBtns.forEach(btn => {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.display = 'flex';
        btn.style.pointerEvents = 'auto';
        btn.style.zIndex = '10';
    });

    console.log(`Ensured visibility for ${allBtns.length} buttons`);
}

// Ensure visibility after animations complete
setTimeout(ensureButtonVisibility, 2000);

// ========================================
// MOBILE TOUCH SUPPORT (FIXED)
// ========================================
function initMobileSupport() {
    // Ensure buttons work on mobile devices
    const allBtns = document.querySelectorAll('.social-btn, .action-btn');

    allBtns.forEach(btn => {
        // Add touch event support for better mobile interaction
        btn.addEventListener('touchstart', function(e) {
            // Prevent double-tap zoom and ensure click works
            e.preventDefault();
            // Add visual feedback for touch
            this.style.transform = 'scale(0.95) translateY(-2px)';
            this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.4)';
        }, { passive: false });

        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            // Reset visual state after touch
            setTimeout(() => {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            }, 150);
        }, { passive: false });

        // Ensure proper hit area on mobile
        if ('ontouchstart' in window) {
            btn.style.minHeight = '48px';
            btn.style.minWidth = '48px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.touchAction = 'manipulation';
            btn.style.WebkitTapHighlightColor = 'rgba(255, 0, 0, 0.3)';
        }

        // Ensure buttons are always clickable
        btn.style.cursor = 'pointer';
        btn.style.pointerEvents = 'auto';
        btn.style.zIndex = '10';
    });

    console.log(`Mobile support initialized for ${allBtns.length} buttons`);
}

// Initialize mobile support
initMobileSupport();