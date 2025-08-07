import './App.css';
import './index.css';
import './components/NavBar/navbar.css';
import './components/ProductList/ProductList.css';
import './components/ProductList/ProductCard.css';
import './components/Cart/Cart.css';
import './components/Checkout/CheckoutForm.css';
import './components/Checkout/OrderConfirmation.css';
import './components/ItemCount/ItemCount.css';
import './components/Loader/loader.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/Checkout/CheckoutForm';
import OrderConfirmation from './components/Checkout/OrderConfirmation';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/order/:orderId" element={<OrderConfirmation />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
