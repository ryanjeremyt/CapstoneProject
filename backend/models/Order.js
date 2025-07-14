const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: Number,
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

// Static method to get next order number
orderSchema.statics.getNextOrderNumber = async function () {
  const lastOrder = await this.findOne().sort({ orderNumber: -1 }).limit(1);
  return lastOrder ? lastOrder.orderNumber + 1 : 242341; // Start from 242341
};

module.exports = mongoose.model("Order", orderSchema);
