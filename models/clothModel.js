const mongoose = require('mongoose');

const clothSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter the quantity'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter the price'],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cloth', clothSchema);
