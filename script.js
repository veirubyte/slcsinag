document.addEventListener('DOMContentLoaded', () => {
    function populateConfetti(container) {
        if (!container) return;
        const colors = ['#FFD700', '#FFFF00', '#FFEA00', '#FDE910', '#FFC100'];
        const confettiCount = 60;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 8 + 6;
            const animationDelay = Math.random() * -15;
            const size = Math.random() * 5 + 5;

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
});
