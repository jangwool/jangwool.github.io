document.documentElement.style.setProperty('--mouse-x', '-9999px');
document.documentElement.style.setProperty('--mouse-y', '-9999px');

function updateMousePosition(event) {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
}

window.addEventListener('mousemove', updateMousePosition);
window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        updateMousePosition(event.touches[0]);
    }
}, { passive: true });
