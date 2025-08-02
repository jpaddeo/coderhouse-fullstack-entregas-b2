import { ticketsService } from '../services/index.js';

export const checkoutsController = {
  create: async (req, res) => {
    try {
      const { cid } = req.params;
      const user = req.user;

      if (!cid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del carrito' });

      const body = {
        cart: cid,
        purchaser: user._id,
      };

      const ticket = await ticketsService.create(body);
      res.status(201).json({
        success: true,
        payload: ticket,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
