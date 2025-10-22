// WhatsApp Button Functionality
document.getElementById('whatsapp-btn').addEventListener('click', function() {
    window.open('https://wa.me/527774808222?text=Hello%20Rock%20City%2C%20I%20want%20more%20information', '_blank');
});

// Save Contact Button Functionality
document.getElementById('save-contact-btn').addEventListener('click', function() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Rock City
TEL:+527774808222
URL:https://www.facebook.com/profile.php?id=61582657080200
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RockCity.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Background Music Playback
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    audio.play().then(function() {
        audio.muted = false; // Unmute after play starts
    }).catch(function(e) {
        // If autoplay fails, play on first user interaction
        document.addEventListener('click', function() {
            audio.play().then(function() {
                audio.muted = false;
            });
        }, { once: true });
    });
});

// Optional: Enhance social media buttons with additional animations if needed
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'running';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'paused';
    });
});