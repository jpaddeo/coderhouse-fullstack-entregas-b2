import { productModel } from './models/product.js';

export default class ProductsDao {
  get(params = {}) {
    if (params.pagination) {
      return productModel.paginate({}, params.pagination);
    }
    return productModel.find(params);
  }

  getBy(params) {
    return productModel.findOne(params);
  }

  create(doc) {
    return productModel.create(doc);
  }

  update(id, data) {
    return productModel.updateOne({ _id: id }, data);
  }

  delete(id) {
    return productModel.findByIdAndDelete(id);
  }
}
