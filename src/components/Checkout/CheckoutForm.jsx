import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
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
    
    try {
      // Simulación de envío a Firebase
      const newOrder = {
        buyer,
        items: cart,
        total: totalPrice,
        date: new Date().toISOString()
      };
      
      // Simulamos un ID de orden
      const simulatedOrderId = `order-${Math.random().toString(36).substr(2, 9)}`;
      setOrderId(simulatedOrderId);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    navigate(`/order/${orderId}`);
    return null;
  }

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
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="name"
              value={buyer.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={buyer.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={buyer.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
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
            {loading ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;