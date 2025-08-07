import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../assets/productos';
import ItemCount from '../ItemCount/ItemCount';
import Loader from '../Loader/Loader';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showItemCount, setShowItemCount] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (!data) {
          setError("Producto no encontrado");
        } else {
          setProduct(data);
        }
      } catch (error) {
        setError("Error al cargar el producto");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    setShowItemCount(false);
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
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
          <ItemCount stock={product.stock} onAdd={handleAddToCart} />
        ) : (
          <div className="added-to-cart">
            <p>¡Producto agregado al carrito!</p>
            <Link to="/cart" className="go-to-cart-btn">Ver carrito</Link>
            <button onClick={() => setShowItemCount(true)} className="add-more-btn">
              Agregar más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
