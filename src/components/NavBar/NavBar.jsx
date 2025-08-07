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
        <li><Link to="/" className="nav-link">Inicio</Link></li>
        <li><Link to="/category/iphone" className="nav-link">iPhone</Link></li>
        <li><Link to="/category/mac" className="nav-link">Mac</Link></li>
        <li><Link to="/category/ipad" className="nav-link">iPad</Link></li>
        <li><Link to="/category/watch" className="nav-link">Apple Watch</Link></li>
        <li><Link to="/category/audio" className="nav-link">Audio</Link></li>
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