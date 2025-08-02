import { ticketModel } from './models/ticket.js';

export default class TicketsDao {
  get(params = {}) {
    return ticketModel.find(params);
  }

  getBy(params) {
    return ticketModel.findOne(params);
  }

  create(doc) {
    return ticketModel.create(doc);
  }

  update(id, data) {
    return ticketModel.updateOne({ _id: id }, data);
  }

  delete(id) {
    return ticketModel.findByIdAndDelete(id);
  }
}
