import bcrypt from 'bcrypt';

import GenericRepository from './generic.js';

export default class UsersRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  _hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  _verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  authenticateUser = async (email, password) => {
    const user = await this.dao.getBy({ email });

    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = this._hashPassword(user.password);
    const isValidPassword = this._verifyPassword(password, hashedPassword);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return user;
  };
}
