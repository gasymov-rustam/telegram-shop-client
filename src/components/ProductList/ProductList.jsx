import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks';
import { ProductItem } from '../ProductItem';
import './ProductList.css';

const products = [
  { id: '1', title: 'Jeans', price: 5000, description: 'Blue, straight' },
  { id: '2', title: 'Jacket', price: 12000, description: 'Green, warm' },
  { id: '3', title: 'Jeans 2', price: 5000, description: 'Blue, straight' },
  { id: '4', title: 'Jacket 8', price: 122, description: 'Blue, straight' },
  { id: '5', title: 'Jeans 3', price: 5000, description: 'Blue, straight' },
  { id: '6', title: 'Jacket 7', price: 600, description: 'Blue, straight' },
  { id: '7', title: 'Jeans 4', price: 5500, description: 'Blue, straight' },
  { id: '8', title: 'Jacket 5', price: 12000, description: 'Blue, straight' },
];

const getTotalPrice = (items) => items.reduce((acc, item) => (acc += item), 0);

export const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onAdd = (product) => {
    let newItems = [];
    const alreadyAdded = addedItems.find((item) => item.id === product.id);

    newItems = alreadyAdded
      ? addedItems.filter((item) => item.id !== product.id)
      : [...addedItems, product];

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy ${getTotalPrice(newItems)}!`,
      });
    }
  };

  const onSendData = useCallback(() => {
    fetch('http://localhost:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: addedItems,
        totalPrice: getTotalPrice(addedItems),
        queryId,
      }),
    });
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  return (
    <div className='list'>
      {products.map((item) => (
        <ProductItem key={item} className='item' product={item} onAdd={onAdd} />
      ))}
    </div>
  );
};
