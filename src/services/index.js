import CartsDao from '../dao/carts.js';
import ProductsDao from '../dao/products.js';
import UsersDao from '../dao/users.js';
import TicketsDao from '../dao/tickets.js';

import CartsRepository from './repositories/carts.js';
import ProductsRepository from './repositories/products.js';
import UsersRepository from './repositories/users.js';
import TicketsRepository from './repositories/tickets.js';

export const cartsService = new CartsRepository(new CartsDao());
export const productsService = new ProductsRepository(new ProductsDao());
export const usersService = new UsersRepository(new UsersDao());
export const ticketsService = new TicketsRepository(new TicketsDao());
