import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));

    axios
      .get("/api/v1/admin/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-2xl font-semibold">Users</h2>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-6">Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4">
            <p>{product.title}</p>
            <p>₹{product.price}</p>
            <button className="bg-red-500 text-white px-4 py-2 mt-2">
              Remove Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
``;
