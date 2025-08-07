// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Ejemplo: total quantity en carrito
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Métodos para agregar, eliminar, etc.

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Aquí defines y exportas el hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
