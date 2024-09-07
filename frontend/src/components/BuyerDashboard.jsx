import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/api/v1/products?search=${searchQuery}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error searching the products!", error);
      });
  };

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
        <div className="products">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
