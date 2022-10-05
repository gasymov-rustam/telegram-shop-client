import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Form, Header, ProductList } from './components';
import { useTelegram } from './hooks';

export const App = () => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path='/form' element={<Form />} />
      </Routes>
      <Header />
      <button onClick={onToggleButton}>Close</button>
    </div>
  );
};
