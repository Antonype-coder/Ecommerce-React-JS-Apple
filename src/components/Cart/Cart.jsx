import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    clearCart, 
    totalPrice 
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="back-to-shop">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Tu Carrito</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <div className="quantity-control">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= 10}
                >
                  +
                </button>
              </div>
              <p>Precio unitario: ${item.price.toLocaleString('es-CO')}</p>
              <p>Subtotal: ${(item.quantity * item.price).toLocaleString('es-CO')}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-item-btn"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${totalPrice.toLocaleString('es-CO')}</h3>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Vaciar carrito
          </button>
          <Link to="/checkout" className="checkout-btn">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;