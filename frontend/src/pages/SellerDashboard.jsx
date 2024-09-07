import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch seller's products and orders
    axios
      .get("/api/v1/seller/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    axios
      .get("/api/v1/seller/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <h2 className="text-xl font-semibold">Your Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4">
            <h2 className="font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Orders</h2>
      <div className="grid grid-cols-2 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4">
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
