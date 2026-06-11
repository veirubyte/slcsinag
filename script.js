document.addEventListener('DOMContentLoaded', () => {
    function populateConfetti(container) {
        if (!container) return;
        const colors = ['#FF3B30', '#007AFF', '#FFCC00', '#34C759', '#AF52DE'];
        const confettiCount = 60;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 4 + 5;
            const animationDelay = Math.random() * -10;
            const size = Math.random() * 4 + 3;

            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${animationDelay}s`;

            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.height = `${size * 1.5}px`;
            }

            container.appendChild(confetti);
        }
    }

    const confettiContainer = document.getElementById('confetti-container');
    populateConfetti(confettiContainer);

    // Audio Setup
    const audio = document.getElementById('bg-audio');
    let isPlaying = false;

    // Intro Screen Logic
    const edsaImages = [
        'assets/edsa/340559679_604959884997829_2342106439164611978_n.jpg',
        'assets/edsa/340931150_741012347757547_9141459669740459653_n.jpg',
        'assets/edsa/346033325_7205215916172045_4833928194154121450_n.jpg',
        'assets/edsa/393265372_226743903513966_8665177615146312963_n.jpg',
        'assets/edsa/438065124_399922172892935_7729559320830478045_n.jpg',
        'assets/edsa/682862810_2016446055611604_1024839058338888250_n.jpg',
        'assets/edsa/709023776_967965589372533_4895905360712647746_n.jpg',
        'assets/edsa/722767376_1548233336926414_3354579306210928700_n.jpg'
    ];

    const slideshowContainer = document.getElementById('slideshow-container');
    let slideshowInterval;
    
    if (slideshowContainer) {
        const shuffled = [...edsaImages].sort(() => Math.random() - 0.5);
        shuffled.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'slideshow-image';
            slideshowContainer.appendChild(img);
            
            if (index === 0) {
                // Dramatic slow appearance from black
                setTimeout(() => {
                    img.classList.add('active');
                }, 500);
            }
        });

        const images = document.querySelectorAll('.slideshow-image');
        let currentIndex = 0;

        slideshowInterval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 6000); // 6 seconds per image allowing for slow 4s crossfade
    }

    let clickCount = 0;
    const introAudio = document.getElementById('intro-audio');
    const blackOverlay = document.getElementById('black-overlay');
    const introScreen = document.getElementById('intro-screen');

    document.addEventListener('click', (e) => {
        if (clickCount === 0) {
            // First click plays music
            if (introAudio) {
                introAudio.play().catch(e => console.log('Intro audio play failed:', e));
            }
            clickCount++;
        } else if (clickCount === 1) {
            // Second click turns screen black
            if (blackOverlay) {
                blackOverlay.style.opacity = '1';
                blackOverlay.style.pointerEvents = 'all'; // Block clicks underneath
            }
            
            // Slowly remove the suspenseful music
            if (introAudio) {
                let vol = 1;
                const fadeOut = setInterval(() => {
                    if (vol > 0.05) {
                        vol -= 0.05;
                        introAudio.volume = vol;
                    } else {
                        clearInterval(fadeOut);
                        introAudio.pause();
                    }
                }, 150); // Fades out over ~3 seconds to match black screen fade
            }
            
            clickCount++;
        } else if (clickCount === 2) {
            // Third click reveals quote screen
            if (blackOverlay) {
                blackOverlay.style.opacity = '0';
                blackOverlay.style.pointerEvents = 'none';
            }
            if (introScreen) {
                introScreen.style.opacity = '0';
                introScreen.style.pointerEvents = 'none';
                setTimeout(() => introScreen.remove(), 3000);
            }
            if (slideshowInterval) clearInterval(slideshowInterval);
            
            // Play quote screen audio instantaneously
            if (audio) {
                audio.play().then(() => {
                    isPlaying = true;
                }).catch(e => console.log('Quote audio play failed:', e));
            }
            
            clickCount++;
        }
    });
});
