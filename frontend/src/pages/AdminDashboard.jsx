import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
const AdminDashboard = () => {
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "Monthly Sales ($)",
      data: [12000, 15000, 11000, 19000, 17000, 23000, 25000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  const userDistributionData = {
    labels: ["Sellers", "Buyers", "Admins"],
    datasets: [{
      label: "User Distribution",
      data: [200, 1500, 10],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    }],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Overview Section */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">$120,000</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">1,710</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-lg font-semibold">Active Orders</h2>
          <p className="text-2xl font-bold">420</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">1,540</p>
        </div>
      </div>

      {/* Sales Line Chart */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales Performance</h2>
        <Line data={salesData} />
      </div>

      {/* User Distribution Doughnut Chart */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded">
        <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
        <Doughnut data={userDistributionData} />
      </div>

      {/* Product Management Table */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded">
        <h2 className="text-xl font-semibold mb-4">Product Management</h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Product A</td>
              <td className="border px-4 py-2">Electronics</td>
              <td className="border px-4 py-2">$500</td>
              <td className="border px-4 py-2">150</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Product B</td>
              <td className="border px-4 py-2">Fashion</td>
              <td className="border px-4 py-2">$150</td>
              <td className="border px-4 py-2">80</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
