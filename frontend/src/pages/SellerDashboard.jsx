import React from "react";
import { Bar } from 'react-chartjs-2';

const SellerDashboard = () => {
  const salesData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [{
      label: "Sales",
      data: [120, 150, 200],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  };

  const ordersData = {
    labels: ["Pending", "Shipped", "Delivered"],
    datasets: [{
      label: "Orders",
      data: [20, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
    }]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-2xl font-bold">$15,000</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-xl font-semibold">Active Products</h2>
          <p className="text-2xl font-bold">80</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-xl font-semibold">Orders This Month</h2>
          <p className="text-2xl font-bold">320</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 shadow-lg rounded">
          <h2 className="text-xl font-semibold mb-4">Sales by Product</h2>
          <Bar data={salesData} />
        </div>
        <div className="bg-white p-6 shadow-lg rounded">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <Bar data={ordersData} />
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Product Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Product</button>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product A</td>
              <td>Electronics</td>
              <td>$500</td>
              <td>200</td>
              <td><button className="text-blue-500">Edit</button> | <button className="text-red-500">Delete</button></td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 shadow-lg rounded">
        <h2 className="text-xl font-semibold mb-4">Order Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">View Orders</button>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#12345</td>
              <td>Shipped</td>
              <td>₹250</td>
              <td>2024-09-01</td>
              <td><button className="text-blue-500">Details</button></td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;
