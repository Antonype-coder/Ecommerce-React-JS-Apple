import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Cargando...</div>;

  if (!order) {
    return (
      <div className="order-confirmation">
        <h2>Orden no encontrada</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido registrada con el ID:</p>
        <p className="order-id">{order.id}</p>
        <p>Fecha: {new Date(order.date?.toDate()).toLocaleString()}</p>
        <p>Total: ${order.total.toLocaleString('es-CO')}</p>
        <p>Estado: {order.status}</p>
        <Link to="/" className="continue-shopping">Seguir comprando</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
