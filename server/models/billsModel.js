const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const billSchema = new mongoose.Schema(
  {
    created_at: {
      type: Date,
    },
    priceSum: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

billSchema.virtual('billProducts', {
  ref: 'BillProducts',
  foreignField: 'bill',
  localField: '_id',
});

billSchema.pre('save', function (next) {
  this.created_at = Date.now();
  next();
});

billSchema.pre(/^find/, async function (next) {
  this.populate('billProducts');
  next();
});

billSchema.plugin(timeZone, { paths: ['date', 'created_at'] });

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
