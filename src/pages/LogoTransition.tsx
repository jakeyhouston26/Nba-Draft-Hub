import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoTransition.css';

export default function LogoTransition() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3500); // 3.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div className="logo-transition" />;
}
