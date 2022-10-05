import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Form, Header, ProductList } from './components';
import { useTelegram } from './hooks';

export const App = () => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
};
