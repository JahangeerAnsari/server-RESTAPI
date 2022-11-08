const mongoose = require('mongoose');
const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim:true
    },
    positon: {
      type: String,
      required: true,
      trim:true
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      // each job is created for the user belogs to the user table
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Job', jobSchema);
