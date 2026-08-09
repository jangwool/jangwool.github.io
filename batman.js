const batmanTrigger = document.querySelector('.batman-trigger');

if (batmanTrigger) {
    batmanTrigger.addEventListener('mouseenter', () => {
        document.body.classList.add('batman-mode');
    });

    batmanTrigger.addEventListener('mouseleave', () => {
        document.body.classList.remove('batman-mode');
    });
}
