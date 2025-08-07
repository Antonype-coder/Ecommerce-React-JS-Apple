import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';
import productos, { getProductsByCategory } from '../../assets/productos';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchProducts = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = category 
            ? getProductsByCategory(category) 
            : productos;
          resolve(data);
        }, 500);
      });
    };

    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [category]);

  if (loading) return <Loader />;

  return (
    <div className="product-list-container">
      <h1>{category ? `Productos ${category}` : 'Todos los productos'}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;