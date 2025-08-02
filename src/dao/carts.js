import { cartModel } from './models/cart.js';

export default class CartsDao {
  get(params = {}) {
    return cartModel.find(params);
  }

  getBy(params) {
    return cartModel.findOne(params);
  }

  create(doc) {
    return cartModel.create(doc);
  }

  update(id, data) {
    return cartModel.updateOne({ _id: id }, data);
  }

  delete(id) {
    return cartModel.findByIdAndDelete(id);
  }
}
