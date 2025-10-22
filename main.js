// ========================================
// BACKGROUND MUSIC
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('background-music');
    const muteBtn = document.getElementById('mute-btn');
    
    // Attempt autoplay
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay blocked, waiting for user interaction');
            // Play on first click/tap
            document.body.addEventListener('click', function() {
                backgroundMusic.play();
            }, { once: true });
        });
    }
    
    // Mute toggle
    muteBtn.addEventListener('click', function() {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            muteBtn.textContent = '🔊';
        } else {
            backgroundMusic.muted = true;
            muteBtn.textContent = '🔇';
        }
    });
});

// ========================================
// POPUP MODAL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const popupModal = document.getElementById('popup-modal');
    const closePopup = document.getElementById('close-popup');
    const agendarCita = document.getElementById('agendar-cita');
    const popupVideo = document.querySelector('.popup-video');
    
    // Open popup (triggered by some button, e.g., floating button)
    // For now, open on page load for demo
    setTimeout(() => {
        popupModal.style.display = 'flex';
        popupVideo.play();
    }, 2000);
    
    // Close popup
    closePopup.addEventListener('click', function() {
        popupModal.style.display = 'none';
        popupVideo.pause();
    });
    
    // Close on outside click
    popupModal.addEventListener('click', function(e) {
        if (e.target === popupModal) {
            popupModal.style.display = 'none';
            popupVideo.pause();
        }
    });
    
    // Agendar Cita button
    agendarCita.addEventListener('click', function() {
        window.open('https://wa.me/527774808222?text=Hola%20Rock%20City%2C%20quiero%20más%20información', '_blank');
        popupModal.style.display = 'none';
        popupVideo.pause();
    });
});

// ========================================
// VCARD GENERATION
// ========================================
document.getElementById('add-contact-btn').addEventListener('click', function() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Rock City
TEL:+527774808222
URL:https://www.facebook.com/profile.php?id=61582657080200
URL:https://www.instagram.com/luisfernandomsnver
URL:https://www.tiktok.com/@rockcitygear
ADR:https://maps.app.goo.gl/PNRWFZFusDoS6X4i9
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

// ========================================
// PARALLAX SCROLL HANDLER
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    parallax.style.transform = `translateY(${rate}px)`;
});

// ========================================
// FIRE ANIMATION FOR SOCIAL BUTTONS
// ========================================
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'running';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'paused';
    });
});

// ========================================
// FLOATING WHATSAPP BUTTON
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            window.open('https://wa.me/527774808222?text=Hola%20Rock%20City%2C%20quiero%20más%20información%20sobre%20sus%20productos', '_blank');
        });
    }
});