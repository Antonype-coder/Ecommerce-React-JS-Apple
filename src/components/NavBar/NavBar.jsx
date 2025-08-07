import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './navbar.css';
import logo from '/logo-apple.png';
import carro from '/carrito.png';

const NavBar = () => {
  const { totalQuantity } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Apple Store" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/category/iphone">iPhone</Link></li>
        <li><Link to="/category/mac">Mac</Link></li>
        <li><Link to="/category/ipad">iPad</Link></li>
        <li><Link to="/category/watch">Apple Watch</Link></li>
        <li><Link to="/category/audio">Audio</Link></li>
        <li>
          <Link to="/cart" className="cart-link">
            <img src={carro} alt="Carrito" className="carro-icon" />
            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;