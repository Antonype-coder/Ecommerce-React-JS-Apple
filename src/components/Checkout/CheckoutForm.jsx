import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const { createOrder } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderId = await createOrder(form);
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Error al finalizar compra:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <button className="submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
