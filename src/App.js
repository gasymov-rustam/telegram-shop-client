import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;
export const App = () => {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => tg.close();

  return (
    <div>
      hi<button onClick={onClose}>Close</button>
    </div>
  );
};
