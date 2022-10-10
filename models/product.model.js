const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 20,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
      require: true,
      trim: true
      // enum:['ikea','apple','sumsung']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product',productSchema);