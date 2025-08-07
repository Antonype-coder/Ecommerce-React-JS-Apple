import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido registrada con el ID:</p>
        <p className="order-id">{orderId}</p>
        <p>Recibirás un correo con los detalles de tu compra.</p>
        <Link to="/" className="continue-shopping">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;