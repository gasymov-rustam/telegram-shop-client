import { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks';
import './Form.css';

export const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('');
  const { tg } = useTelegram();

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Send credentials',
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, tg.MainButton]);

  return (
    <div>
      <input
        className='input'
        type='text'
        placeholder='Country'
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className='input'
        type='text'
        placeholder='Street'
        value={street}
        onChange={onChangeStreet}
      />

      <select className='select' value={subject} onChange={onChangeSubject}>
        <option value='physical'>Individual entrepreneur</option>
        <option value='legal'>Legal entity entrepreneur</option>
      </select>
    </div>
  );
};
