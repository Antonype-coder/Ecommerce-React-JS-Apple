import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import productos from '../../assets/productos';
import ItemCount from '../ItemCount/ItemCount';
import Loader from '../Loader/Loader';
import './ProductDetail.css';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showItemCount, setShowItemCount] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const found = productos.find(p => p.id === parseInt(id));
          resolve(found);
        }, 500);
      });
    };

    fetchProduct().then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    setShowItemCount(false);
  };

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="container">
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info-container">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toLocaleString('es-CO')}</p>
        <p className="description">{product.description}</p>
        <p className="stock">Disponibles: {product.stock}</p>
        
        {showItemCount ? (
          <ItemCount 
            stock={product.stock} 
            onAdd={handleAddToCart}
          />
        ) : (
          <div className="added-to-cart">
            <p>¡Producto agregado al carrito!</p>
            <Link to="/cart" className="go-to-cart-btn">
              Ver carrito
            </Link>
            <button 
              onClick={() => setShowItemCount(true)}
              className="add-more-btn"
            >
              Agregar más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;