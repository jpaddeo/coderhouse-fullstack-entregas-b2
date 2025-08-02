import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    required: true,
  },
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
