const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productPictures: [
      {
        img: {
          type: String,
          required:true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Product', productSchema);
