import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const { cart, totalPrice, createOrder } = useCart();
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderId = await createOrder(buyer);
      navigate(`/order/${orderId}`);
    } catch (error) {
      setError("Error al procesar la orden. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Resumen de tu orden</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${(item.price * item.quantity).toLocaleString('es-CO')}
              </li>
            ))}
          </ul>
          <p className="order-total">Total: ${totalPrice.toLocaleString('es-CO')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Información de contacto</h3>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Nombre completo</label>
            <input type="text" name="name" value={buyer.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={buyer.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" name="phone" value={buyer.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" name="address" value={buyer.address} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={loading || cart.length === 0} className="submit-btn">
            {loading ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
