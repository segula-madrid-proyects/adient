import { useEffect, useRef, useState } from 'react';

const SESSION_DURATION = 300; // 5 minutos en segundos

function SessionTimer() {
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const timeLeftRef = useRef(SESSION_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);

      if (timeLeftRef.current <= 0) {
        clearInterval(interval);
        alert('Sesión expirada por inactividad. Serás redirigido al inicio.');
        window.location.href = '/';
      }
    }, 1000);

    const resetTimer = () => {
      timeLeftRef.current = SESSION_DURATION;
      setTimeLeft(SESSION_DURATION);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => document.addEventListener(event, resetTimer, true));

    return () => {
      clearInterval(interval);
      events.forEach((event) => document.removeEventListener(event, resetTimer, true));
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="session-timer">
      Tiempo restante de sesión: <span id="countdown">{minutes}:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}

export default SessionTimer;
