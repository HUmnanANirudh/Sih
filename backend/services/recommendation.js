const Product = require('../models/product');
const Order = require('../models/order');

async function getRecommendations(userId) {
  // Fetch past orders by the user
  const orders = await Order.find({ buyer: userId }).populate('products.product');
  
  // Aggregate product categories or types from previous purchases
  const purchasedProductIds = orders.flatMap(order => order.products.map(p => p.product._id));
  
  // Recommend products that the user hasn't bought yet
  const recommendations = await Product.find({ _id: { $nin: purchasedProductIds } }).limit(10);

  return recommendations;
}

module.exports = getRecommendations;
