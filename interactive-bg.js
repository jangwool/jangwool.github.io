const canvas = document.getElementById('interactive-bg');
const ctx = canvas.getContext('2d');
const particles = [];
const mouse = { x: null, y: null, radius: 160 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function createParticles() {
    particles.length = 0;
    const count = Math.max(45, Math.min(130, Math.floor(window.innerWidth / 10)));

    for (let i = 0; i < count; i += 1) {
        particles.push({
            x: random(0, canvas.width),
            y: random(0, canvas.height),
            vx: random(-0.35, 0.35),
            vy: random(-0.35, 0.35),
            size: random(1.2, 2.4),
        });
    }
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lineColor = 'rgba(56, 189, 248, 0.18)';
    const dotColor = 'rgba(56, 189, 248, 0.22)';
    const glowColor = 'rgba(56, 189, 248, 0.35)';

    for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20 || particle.x > canvas.width + 20) particle.vx *= -1;
        if (particle.y < -20 || particle.y > canvas.height + 20) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
            const a = particles[i];
            const b = particles[j];
            const dist = distance(a, b);

            if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    if (mouse.x !== null) {
        ctx.beginPath();
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 0.7);
        glow.addColorStop(0, glowColor);
        glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = glow;
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.9, 0, Math.PI * 2);
        ctx.fill();

        for (const particle of particles) {
            const dist = distance(mouse, particle);
            if (dist < mouse.radius) {
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.22 - dist / (mouse.radius * 3)})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                particle.x += (mouse.x - particle.x) * 0.002;
                particle.y += (mouse.y - particle.y) * 0.002;
            }
        }
    }

    requestAnimationFrame(drawBackground);
}

function initBackground() {
    resizeCanvas();
    createParticles();
    drawBackground();
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('load', initBackground);
