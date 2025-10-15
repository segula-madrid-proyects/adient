// Temporizador de auto-logout para kiosko
let timeLeft = 300; // 5 minutos en segundos

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('countdown').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
        alert('Sesión expirada por inactividad. Serás redirigido al inicio.');
        window.location.href = '/logout';
    }
    timeLeft--;
}

setInterval(updateTimer, 1000);

// Reiniciar temporizador con cualquier actividad del usuario
const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

activityEvents.forEach(event => {
    document.addEventListener(event, () => {
        timeLeft = 300; // Reiniciar a 5 minutos
    }, true);
});