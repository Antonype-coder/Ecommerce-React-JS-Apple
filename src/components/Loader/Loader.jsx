import './Loader.css';

const Loader = ({ small = false }) => {
  return (
    <div className={`loader-container ${small ? 'small' : ''}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;