import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'productos'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }]
});

export default mongoose.model('Cart', cartSchema);
