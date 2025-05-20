import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoTransition() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3500); // 3.5 seconds total

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url(/assets/logo-transition.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      animation: 'fadeFullScreen 3.5s ease-in-out forwards'
    }}>
      <style>
        {`
          @keyframes fadeFullScreen {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
