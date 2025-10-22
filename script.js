// ========================================
// MÚSICA DE FONDO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  
  // Intentar reproducir automáticamente
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Autoplay bloqueado, esperando interacción del usuario');
      // Reproducir en el primer clic/tap
      document.body.addEventListener('click', function() {
        backgroundMusic.play();
      }, { once: true });
    });
  }
});

// ========================================
// BOTÓN AGENDAR CITA
// ========================================
document.querySelector('.agendar-btn').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  // Abrir WhatsApp en nueva pestaña
  window.open(
    'https://wa.me/527774808222?text=Hola%20Rock%20City%2C%20quiero%20más%20información',
    '_blank',
    'noopener,noreferrer'
  );
});

// ========================================
// SAVE CONTACT BUTTON
// ========================================
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

// ========================================
// SOCIAL MEDIA ANIMATIONS
// ========================================
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'running';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'paused';
    });
});