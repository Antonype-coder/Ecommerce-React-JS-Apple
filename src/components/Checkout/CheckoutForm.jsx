import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './CheckoutForm.css';
import Loader from '../Loader/Loader';

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const createOrder = async () => {
    const order = {
      buyer,
      items: cart,
      total: totalPrice,
      date: serverTimestamp(),
      status: 'completed',
      paymentMethod: 'online'
    };

    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setError("Tu carrito está vacío");
      return;
    }

    if (!buyer.email.includes('@')) {
      setError("Por favor ingresa un email válido");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const orderId = await createOrder();
      setSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate(`/order/${orderId}`);
      }, 2000);
    } catch (error) {
      setError("Ocurrió un error al procesar tu pago. Por favor intenta nuevamente.");
      console.error("Error en el pago:", error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      {success && (
        <div className="success-message">
          <p>¡Pago completado con éxito!</p>
          <p>Redirigiendo a tu comprobante...</p>
        </div>
      )}

      {!success && (
        <div className="checkout-content">
          <div className="order-summary">
            <h3>Resumen de tu orden</h3>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString('es-CO')}</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <h3>Información de contacto</h3>
            
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Nombre completo*</label>
              <input
                type="text"
                name="name"
                value={buyer.name}
                onChange={handleChange}
                required
                minLength="3"
              />
            </div>

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={buyer.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono*</label>
              <input
                type="tel"
                name="phone"
                value={buyer.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10,15}"
              />
            </div>

            <div className="form-group">
              <label>Dirección*</label>
              <input
                type="text"
                name="address"
                value={buyer.address}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="submit-btn"
            >
              {loading ? <Loader small /> : 'Confirmar Pago'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;