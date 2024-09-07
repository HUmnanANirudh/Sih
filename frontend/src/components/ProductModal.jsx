import React from "react";

function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-bold">₹{product.price}</p>
      </div>
    </div>
  );
}

export default ProductModal;
