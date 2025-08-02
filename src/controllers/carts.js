import { cartsService } from '../services/index.js';

export const cartsController = {
  getAll: async (req, res) => {
    try {
      const carts = await cartsService.getAll(req.query);
      res.status(200).json({
        success: true,
        payload: carts,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { cid } = req.params;

      if (!cid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del carrito' });

      const cart = await cartsService.getById(cid);
      res.status(200).json({
        success: true,
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const cart = await cartsService.create(req.body);
      res.status(201).json({
        success: true,
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      if (!cid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del carrito' });

      const cart = await cartsService.update(cid, products);
      res.status(200).json({
        success: true,
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { cid } = req.params;

      if (!cid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del carrito' });

      const response = await cartsService.deleted(cid);

      res.status(200).json({
        success: true,
        payload: response,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  addProductById: async (req, res) => {
    try {
      const { cid, pid } = req.params;

      if (!cid || !pid)
        return res.status(400).json({
          success: false,
          error: 'El ID de Carrito y el ID de Producto son requeridos',
        });

      const cart = await cartService.getById(cid);
      if (!cart)
        return res.status(404).json({
          success: false,
          error: `El carrito con ID ${cid} no existe`,
        });

      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === pid
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({
          product: pid,
          quantity: 1,
        });
      }
      const updatedCart = await cartsService.update(cid, cart.products);
      res.status(201).json({
        success: true,
        payload: updatedCart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateProductById: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      if (
        !cid ||
        !pid ||
        quantity === undefined ||
        isNaN(parsedQuantity) ||
        parsedQuantity <= 0
      )
        return res.status(400).json({
          success: false,
          error:
            'El ID de Carrito, ID de Producto y cantidad son requeridos. Adicionalmente, la cantidad debe ser un número positivo.',
        });

      const cart = await cartService.getById(cid);
      if (!cart)
        return res.status(404).json({
          success: false,
          error: `El carrito con ID ${cid} no existe`,
        });

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === pid
      );

      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          error: `El producto con ID ${pid} no está en el carrito`,
        });
      }
      cart.products[productIndex].quantity = parsedQuantity;

      const updatedCart = await cartsService.update(cid, cart.products);

      res.status(200).json({
        success: true,
        payload: updatedCart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const { cid, pid } = req.params;

      if (!cid || !pid)
        return res.status(400).json({
          success: false,
          error: 'El ID de Carrito y el ID de Producto son requeridos',
        });

      const cart = await cartService.getById(cid);
      if (!cart)
        return res.status(404).json({
          success: false,
          error: `El carrito con ID ${cid} no existe`,
        });

      const newProducts = cart.products.filter(
        (item) => item.product.toString() !== pid
      );

      const updatedCart = await cartsService.update(cid, newProducts);

      res.status(200).json({
        success: true,
        payload: updatedCart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
