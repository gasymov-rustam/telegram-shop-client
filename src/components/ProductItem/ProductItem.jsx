import { Button } from '../Button';
import './ProductItem.css';

export const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={`product ${className}`}>
      <div className='img' />
      <div className='title'>{product.title}</div>
      <div className='description'>{product.description}</div>
      <div className='price'>
        <span>
          Price: <b>{product.price}</b>
        </span>
        <Button className='add-btn' onClick={onAddHandler}>
          Add to basket
        </Button>
      </div>
    </div>
  );
};
