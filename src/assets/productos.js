const productos = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 5999000,
    category: 'iphone',
    image: 'https://http2.mlstatic.com/D_NQ_NP_912227-MLA71782903150_092023-O.webp',
    description: 'Pantalla Super Retina XDR de 6.7", chip A17 Pro, cámara triple de 48MP.',
    stock: 15
  },
  {
    id: 2,
    name: 'iPhone 15',
    price: 4299000,
    category: 'iphone',
    image: 'https://exitocol.vtexassets.com/arquivos/ids/22695882/iphone-15-128gb-nuevo-negro.jpg?v=638697002090670000',
    description: 'Pantalla Super Retina XDR de 6.1", chip A16 Bionic, cámara dual de 48MP.',
    stock: 20
  },
  {
    id: 3,
    name: 'MacBook Air M2',
    price: 5499000,
    category: 'mac',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606',
    description: 'Pantalla Retina de 13.6", chip M2, 8GB RAM, 256GB SSD.',
    stock: 10
  },
  {
    id: 4,
    name: 'MacBook Pro 14" M3 Pro',
    price: 10999000,
    category: 'mac',
    image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111902_mbp14-silver2.png',
    description: 'Pantalla Liquid Retina XDR, chip M3 Pro, 18GB RAM, 512GB SSD.',
    stock: 8
  },
  {
    id: 5,
    name: 'iPad Pro 12.9" M2',
    price: 7999000,
    category: 'ipad',
    image: 'https://co.tiendasishop.com/cdn/shop/files/iPad_Pro_Wi-Fi_12-9_in_6th_generation_Space_Gray_PDP_Image_Position-1b__MXLA_4093ea36-501a-4b23-8c0d-2a9e939f3e3a.jpg?v=1709684784&width=823',
    description: 'Pantalla Liquid Retina XDR, chip M2, compatibilidad con Apple Pencil 2.',
    stock: 12
  },
  {
    id: 6,
    name: 'iPad Air M1',
    price: 3999000,
    category: 'ipad',
    image: 'https://http2.mlstatic.com/D_Q_NP_685126-MLU69497701479_052023-O.webp',
    description: 'Pantalla Liquid Retina de 10.9", chip M1, compatibilidad con Magic Keyboard.',
    stock: 18
  },
  {
    id: 7,
    name: 'Apple Watch Series 9',
    price: 2499000,
    category: 'watch',
    image: 'https://exitocol.vtexassets.com/arquivos/ids/22758444/apple-watch-serie-9-41mm-negro.jpg?v=638506264374170000',
    description: 'Pantalla Retina Always-On, GPS + Cellular, monitor de salud avanzado.',
    stock: 25
  },
  {
    id: 8,
    name: 'Apple Watch Ultra 2',
    price: 4999000,
    category: 'watch',
    image: 'https://exitocol.vteximg.com.br/arquivos/ids/24245758/WATCH-ULTRA-2-49-TI-Azul-APPLE-MREG3BEA-3474755_a.jpg',
    description: 'Diseño resistente, batería de 36 horas, ideal para deportes extremos.',
    stock: 5
  },
  {
    id: 9,
    name: 'AirPods Pro (2da generación)',
    price: 1499000,
    category: 'audio',
    image: 'https://exitocol.vtexassets.com/arquivos/ids/28935306/apple-airpods-pro-2-generacion-originales.jpg?v=638859896429530000',
    description: 'Cancelación activa de ruido, sonido espacial, resistencia al agua IPX4.',
    stock: 30
  },
  {
    id: 10,
    name: 'AirPods Max',
    price: 3499000,
    category: 'audio',
    image: 'https://exitocol.vtexassets.com/arquivos/ids/11646360/apple-airpods-max-space-gray.jpg?v=637787197026800000',
    description: 'Calidad de sonido excepcional, cancelación activa de ruido, diseño premium.',
    stock: 7
  }
];

export const getProductsByCategory = (category) => {
  return productos.filter(product => product.category === category);
};

export const getCategories = () => {
  const categories = productos.map(product => product.category);
  return [...new Set(categories)];
};

export default productos;