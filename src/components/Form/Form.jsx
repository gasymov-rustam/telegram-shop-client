// /* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks';
import './Form.css';

export const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Send credentials',
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, tg]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className='form'>
      <h1>Enter your credentials</h1>
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
