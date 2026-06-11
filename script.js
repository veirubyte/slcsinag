document.addEventListener('DOMContentLoaded', () => {
    const firefliesContainer = document.getElementById('fireflies-container');
    const numFireflies = 30;

    // Generate fireflies
    for (let i = 0; i < numFireflies; i++) {
        let firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // Randomize size, position, and animation timing
        const size = Math.random() * 3 + 2; // 2px to 5px
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        
        firefly.style.left = `${Math.random() * 100}vw`;
        firefly.style.top = `${Math.random() * 100}vh`;
        
        const flashDuration = Math.random() * 3 + 3; // 3s to 6s
        const moveDuration = Math.random() * 15 + 15; // 15s to 30s
        const delay = Math.random() * 5; // 0s to 5s
        
        firefly.style.animationDuration = `${flashDuration}s, ${moveDuration}s`;
        firefly.style.animationDelay = `${delay}s, ${delay}s`;
        
        firefliesContainer.appendChild(firefly);
    }

    // Generate confetti for scene 2
    const confettiContainer = document.getElementById('confetti-container');
    const numConfetti = 40; // Not too distracting

    for (let i = 0; i < numConfetti; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Randomize size, position, and animation timing
        const width = Math.random() * 3 + 3; // 3px to 6px
        const height = Math.random() * 6 + 4; // 4px to 10px
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
        
        confetti.style.left = `${Math.random() * 100}vw`;
        
        const fallDuration = Math.random() * 6 + 8; // 8s to 14s (slower, less distracting)
        const delay = -(Math.random() * 15); // Negative delay so they are already falling
        
        confetti.style.animationDuration = `${fallDuration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        confettiContainer.appendChild(confetti);
    }

    let clickCount = 0;
    const scene1 = document.getElementById('scene1');
    const darkOverlay = document.getElementById('dark-overlay');
    const scene2 = document.getElementById('scene2');
    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.5; // Make the music 50% lower
    
    // Try playing immediately, might be blocked by browser policy
    bgMusic.play().catch(() => {});

    scene1.addEventListener('click', () => {
        // Ensure music plays if it was blocked by autoplay policy
        if (bgMusic.paused && clickCount === 0) {
            bgMusic.play().catch(() => {});
        }

        if (clickCount === 0) {
            // First click: darken the scene
            darkOverlay.classList.add('darken');
            clickCount++;
        } else if (clickCount === 1) {
            // Second click: transition to next scene
            scene1.classList.remove('active');
            scene2.classList.add('active');
            bgMusic.pause();
            clickCount++;
        }
    });
});
