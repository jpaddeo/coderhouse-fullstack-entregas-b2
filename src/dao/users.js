import { userModel } from './models/user.js';

export default class UsersDao {
  get(params = {}) {
    return userModel.find(params);
  }

  getBy(params) {
    return userModel.findOne(params);
  }

  create(doc) {
    return userModel.create(doc);
  }

  update(id, data) {
    return userModel.updateOne({ _id: id }, data);
  }

  delete(id) {
    return userModel.findByIdAndDelete(id);
  }
}
