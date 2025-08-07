import { useParams } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  if (!orderId) return <p>Cargando comprobante...</p>;

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es:</p>
        <strong className="order-id">{orderId}</strong>
        <a href="/" className="continue-shopping">Seguir comprando</a>
      </div>
    </div>
  );
};

export default OrderConfirmation;
