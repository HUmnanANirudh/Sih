import React from "react";

function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/2 relative flex">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Image on the left */}
        <div className="w-1/2 h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded"
          />
        </div>

        {/* Product details on the right */}
        <div className="w-1/2 pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">₹{product.price}</p>
          </div>

          {/* Add to Cart button */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
