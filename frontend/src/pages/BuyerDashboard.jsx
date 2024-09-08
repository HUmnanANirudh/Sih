import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductModal from "../components/ProductModal";

function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:6969/api/v1/buyer/products?page=${pageNumber}`);
      setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };

  if (loading && products.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="container mx-auto p-4">
        {products.length === 0 ? (
          <div>No products available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-4 rounded"/>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
        {products.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default BuyerDashboard;
