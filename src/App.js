import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks';

const tg = window.Telegram.WebApp;

export const App = () => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div>
      <button onClick={onToggleButton}>Close</button>
    </div>
  );
};
