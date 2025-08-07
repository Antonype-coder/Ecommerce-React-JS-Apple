import { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ initial = 1, stock = 10, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => quantity < stock && setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button onClick={decrement} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={increment} disabled={quantity >= stock}>+</button>
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={() => onAdd(quantity)}
        disabled={stock === 0}
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default ItemCount;