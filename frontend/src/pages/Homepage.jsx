import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our E-Commerce Platform
      </h1>
      <p className="text-xl mb-6 text-gray-700">
        Explore a world of products, manage your store, or oversee platform
        operations.
      </p>
      <div className="space-y-4">
        <Link
          to="/buyer"
          className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Go to Buyer Dashboard
        </Link>
        <Link
          to="/seller"
          className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600 transition duration-300"
        >
          Go to Seller Dashboard
        </Link>
        <Link
          to="/admin"
          className="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600 transition duration-300"
        >
          Go to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
