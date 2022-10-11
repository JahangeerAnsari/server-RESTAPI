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
    rating:{
      
      type: Number,
      
    },
    featured: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
      required:true,
      enum: {
        values: ['ikea', 'liddy', 'caressa','marcos'],
        message:'{VALUE} is not supported'
      },
      // enum:['ikea','apple','sumsung']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product',productSchema);