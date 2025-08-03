import { productsService, ticketsService } from '../services/index.js';

const validateBody = async (body) => {
  const { items } = body;

  return await Promise.all(
    items.map(async (item) => {
      const product = await productsService.getById(item.product);
      return product && product.stock >= item.quantity;
    })
  ).then((results) => results.every(Boolean));
};

export const checkoutsController = {
  get: async (req, res) => {
    try {
      const { tid } = req.params;
      if (!tid)
        return res
          .status(400)
          .json({ success: false, error: 'Ticket ID is required' });

      const ticket = await ticketsService.getById(tid);

      if (!ticket)
        return res
          .status(404)
          .json({ success: false, error: 'Ticket not found' });

      res.status(200).json({
        success: true,
        payload: ticket,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const user = req.user;

      const { items } = req.body;

      const body = {
        ...req.body,
        purchaser: user._id,
      };

      if (!(await validateBody(body))) {
        return res.status(400).json({
          success: false,
          error:
            'Los productos incluídos no existen o no tienen suficiente stock',
        });
      }

      const ticket = await ticketsService.create(body);

      for (const item of items) {
        const product = await productsService.getById(item.product);
        await productsService.update(item.product, {
          stock: product.stock - item.quantity,
        });
      }

      res.status(201).json({
        success: true,
        payload: ticket,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
