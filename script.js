// ========================================
// CONFIGURACIÓN INICIAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initStars();
    initFloatingHearts();
    initScrollAnimations();
    initLoveButton();
    initParallax();
});

// ========================================
// GENERAR ESTRELLAS ANIMADAS EN EL FONDO
// ========================================

function initStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 50;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Retraso de animación aleatorio
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Duración de animación aleatoria
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// ========================================
// CORAZONES FLOTANTES CONTINUOS
// ========================================

function initFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['💙', '💖', '💗', '💕', '✨', '⭐'];
    
    // Crear corazones iniciales
    for (let i = 0; i < 8; i++) {
        createFloatingHeart(heartsContainer, heartEmojis);
    }
    
    // Crear nuevos corazones periódicamente
    setInterval(() => {
        createFloatingHeart(heartsContainer, heartEmojis);
    }, 3000);
}

function createFloatingHeart(container, emojis) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 15 + 15;
    heart.style.fontSize = size + 'px';
    
    // Retraso aleatorio
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    // Duración aleatoria
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    
    container.appendChild(heart);
    
    // Eliminar después de la animación
    setTimeout(() => {
        heart.remove();
    }, 13000);
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animación especial para cards de galería
                if (entry.target.classList.contains('gallery-card')) {
                    const cards = document.querySelectorAll('.gallery-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos - SOLO si no están en viewport
    const elementsToAnimate = document.querySelectorAll('.gallery-card, .dream-item, .february-content, .letter-content');
    elementsToAnimate.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        // Solo agregar animación si NO está visible al cargar
        if (!isInViewport) {
            el.classList.add('animate-on-scroll');
        } else {
            // Si ya está visible, mostrar inmediatamente
            el.classList.add('visible');
        }
        
        observer.observe(el);
    });
}

// ========================================
// EFECTO PARALLAX EN HERO
// ========================================

function initParallax() {
    const hero = document.getElementById('hero');
    const doraemonHero = document.querySelector('.doraemon-hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            // Efecto parallax en Doraemon
            if (doraemonHero) {
                doraemonHero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            // Fade out del hero
            hero.style.opacity = 1 - (scrolled / heroHeight);
        }
    });
}

// ========================================
// BOTÓN "TE AMO" CON EXPLOSIÓN DE CORAZONES
// ========================================

function initLoveButton() {
    const loveButton = document.getElementById('loveButton');
    const heartsExplosion = document.getElementById('heartsExplosion');
    const doraemonFinale = document.getElementById('doraemonFinale');
    
    loveButton.addEventListener('click', function() {
        // Hacer que Doraemon rebote feliz
        const doraemonSvg = doraemonFinale.querySelector('.doraemon-bounce');
        doraemonSvg.classList.add('celebrate');
        
        setTimeout(() => {
            doraemonSvg.classList.remove('celebrate');
        }, 600);
        
        // Crear explosión de corazones
        createHeartsExplosion(heartsExplosion);
        
        // Vibración del botón
        loveButton.style.animation = 'none';
        setTimeout(() => {
            loveButton.style.animation = '';
        }, 10);
        
        // Feedback visual
        loveButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            loveButton.style.transform = '';
        }, 100);
    });
}

function createHeartsExplosion(container) {
    const heartEmojis = ['💙', '💖', '💗', '💕', '💝', '💓', '💘', '✨', '⭐', '🌟'];
    const numberOfHearts = 30;
    
    // Obtener posición del centro de la pantalla
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Posición inicial (centro)
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        
        // Calcular dirección aleatoria de explosión
        const angle = (Math.PI * 2 * i) / numberOfHearts;
        const velocity = Math.random() * 300 + 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        // Tamaño aleatorio
        const size = Math.random() * 20 + 25;
        heart.style.fontSize = size + 'px';
        
        // Retraso aleatorio
        heart.style.animationDelay = Math.random() * 0.2 + 's';
        
        container.appendChild(heart);
        
        // Eliminar después de la animación
        setTimeout(() => {
            heart.remove();
        }, 2200);
    }
    
    // Sonido de celebración (opcional, usar Web Audio API)
    playHappySound();
}

// ========================================
// SONIDO DE CELEBRACIÓN (OPCIONAL)
// ========================================

function playHappySound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Melodía romántica: Do-Mi-Sol-Do (acorde de amor)
        const notes = [
            {freq: 523.25, time: 0, duration: 0.3},    // Do
            {freq: 659.25, time: 0.15, duration: 0.3},  // Mi
            {freq: 783.99, time: 0.3, duration: 0.5},   // Sol
            {freq: 1046.50, time: 0.5, duration: 0.8}   // Do alto (más largo)
        ];
        
        notes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = note.freq;
            osc.type = 'triangle'; // Sonido más suave y romántico
            
            const startTime = audioContext.currentTime + note.time;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05); // Fade in
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
            
            osc.start(startTime);
            osc.stop(startTime + note.duration);
        });
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========================================
// EFECTO HOVER EN TARJETAS DE GALERÍA
// ========================================

const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Efecto de brillo
        this.style.boxShadow = '0 20px 60px rgba(0, 147, 221, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ========================================
// EFECTO DE PARTÍCULAS EN HOVER DE DORAEMON
// ========================================

const doraemonElements = document.querySelectorAll('.doraemon-svg, .doraemon-letter-character svg, .doraemon-bounce');

doraemonElements.forEach(doraemon => {
    doraemon.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Agregar animación de sparkle CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// CONTADOR DE DÍAS DESDE EL 14 DE FEBRERO
// ========================================

function calculateDaysTogether() {
    // Puedes ajustar el año según corresponda
    const startDate = new Date('2025-02-14'); // Ajusta el año si es necesario
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Agregar contador si quieres mostrarlo
const daysTogether = calculateDaysTogether();
console.log(`Días juntos desde el 14 de febrero: ${daysTogether}`);

// ========================================
// EFECTO DE ESCRITURA PARA TEXTOS
// ========================================

function typeWriter(element, text, speed = 50) {
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

// ========================================
// EASTER EGG: DOBLE CLICK EN DORAEMON
// ========================================

let doraemonClickCount = 0;
const doraemonHeroSvg = document.querySelector('.doraemon-hero .doraemon-svg');

if (doraemonHeroSvg) {
    doraemonHeroSvg.addEventListener('dblclick', function(event) {
        doraemonClickCount++;
        
        // Calcular el centro del Doraemon, no del viewport
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        const centerY = rect.top + (rect.height / 2);
        
        if (doraemonClickCount === 1) {
            // Primera vez: mensaje especial
            showSecretMessage('¡Doraemon te envía un abrazo especial! 🤗');
        } else if (doraemonClickCount === 3) {
            // Tercera vez: explosión extra de corazones desde Doraemon
            createHeartsExplosionFrom(centerX, centerY);
            showSecretMessage('¡Wow! ¡Triple amor desbloqueado! 💙💙💙');
        }
    });
}

function createHeartsExplosionFrom(startX, startY) {
    const heartsExplosion = document.getElementById('heartsExplosion');
    const heartEmojis = ['💙', '💖', '💗', '💕', '💝', '💓', '💘', '✨', '⭐', '🌟'];
    const numberOfHearts = 30;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Posición inicial donde está Doraemon
        heart.style.left = startX + 'px';
        heart.style.top = startY + 'px';
        
        // Calcular dirección aleatoria de explosión
        const angle = (Math.PI * 2 * i) / numberOfHearts;
        const velocity = Math.random() * 300 + 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        // Tamaño aleatorio
        const size = Math.random() * 20 + 25;
        heart.style.fontSize = size + 'px';
        
        // Retraso aleatorio
        heart.style.animationDelay = Math.random() * 0.2 + 's';
        
        heartsExplosion.appendChild(heart);
        
        // Eliminar después de la animación
        setTimeout(() => {
            heart.remove();
        }, 2200);
    }
    
    playHappySound();
}

function showSecretMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: white;
        padding: 20px 40px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 147, 221, 0.4);
        font-size: 1.3rem;
        font-weight: 600;
        color: #0093DD;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Forzar aplicación de estilos
    requestAnimationFrame(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 2500);
}

// Animación de fadeOut
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// ========================================
// CAMBIO DE TEMA (OPCIONAL)
// ========================================

// Esta función está lista por si quieres agregar un botón de tema día/noche
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

const btn = document.getElementById("loveBtn");

btn.addEventListener("click", (event) => {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // MÓVIL: Desde abajo pero más rápido
    for (let i = 0; i < 20; i++) {
      let heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = "1.8rem";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.animation = "floatUpMobile 2s linear"; // Más rápido
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2000);
    }
  } else {
    // DESKTOP: Animación original
    for (let i = 0; i < 25; i++) {
      let heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = "2rem";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.animation = "floatUp 3s linear";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 3000);
    }
  }
});

const styleFloat = document.createElement("style");
styleFloat.innerHTML = `
@keyframes floatUp {
  to {
    transform: translateY(-120vh);
    opacity: 0;
  }
}

@keyframes floatUpMobile {
  to {
    transform: translateY(-120vh);
    opacity: 0;
  }
}`;
document.head.appendChild(styleFloat);

// ========================================
// LOG DE BIENVENIDA EN CONSOLA
// ========================================

console.log('%c💙 Nyah & Eddu 💙', 'font-size: 30px; font-weight: bold; color: #0093DD;');
console.log('%c¡Feliz San Valentín! 💖', 'font-size: 20px; color: #FF85B3;');
console.log('%cHecho con amor por Eddu para Nyah', 'font-size: 14px; color: #666;');
console.log('%c✨ Easter Egg: Intenta hacer doble click en Doraemon ✨', 'font-size: 12px; color: #FFD700; font-style: italic;');