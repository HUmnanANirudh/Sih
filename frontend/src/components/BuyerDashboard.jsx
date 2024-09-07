import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';

function BuyerDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:6969/api/v1/buyer/products?page=1&limit=100")
            .then((res) => {
                console.log("Response data:", res.data); // Log response data
                setProducts(res.data.products || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the products!", error);
                setError("Failed to load products.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Navbar />
            <div className="container">
                {products.length === 0 ? (
                    <div>No products available.</div>
                ) : (
                    <div className="products">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <img src={product.image} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>₹{product.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BuyerDashboard;
