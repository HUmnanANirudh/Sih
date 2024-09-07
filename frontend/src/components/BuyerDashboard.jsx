import { useState, useEffect } from "react";
import Navbar from './Navbar';
import axios from "axios";

function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the products!");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`/api/v1/products?search=${searchQuery}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error searching the products!");
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
          />
          <button type="submit">Search</button>
        </form>
        <div>
          {products.length > 0 ? (
            products.map((products) => (
              <div key={products._id}>
                <img src={products.image} alt={products.title} />
                <h3>{products.title}</h3>
                <p>{products.description}</p>
                <p>${products.price}</p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
