import { createContext, useContext, useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase/config';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const createOrder = async (buyerData) => {
    const order = {
      buyer: buyerData,
      items: cart,
      total: totalPrice,
      date: serverTimestamp(),
      status: 'pending'
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      clearCart();
      return docRef.id;
    } catch (error) {
      console.error("Error creating order: ", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        createOrder,
        totalQuantity, 
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
