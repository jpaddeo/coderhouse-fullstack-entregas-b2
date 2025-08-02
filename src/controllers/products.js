import { productsService } from '../services/index.js';

import {
  addNavigationLinks,
  buildPaginationOptions,
} from '../utils/pagination.js';
import { validateRequiredFields } from '../utils/requests.js';

import { paginatedProductsDto } from '../dtos/paginated-products.js';

export const productsController = {
  getAll: async (req, res) => {
    try {
      const query = req.query;
      const paginationOptions = buildPaginationOptions(query);
      if (paginationOptions) {
        query.pagination = paginationOptions;
        const products = await productsService.getAll(query);
        addNavigationLinks(products, 'api/products', query);
        res.status(200).json(paginatedProductsDto.response(products, true));
      } else {
        const products = await productsService.getAll(query);
        res.status(200).json({
          success: true,
          payload: products,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { pid } = req.params;

      if (!pid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del producto' });

      const product = await productsService.getById(pid);
      res.status(200).json({
        success: true,
        payload: product,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const requiredFields = [
        'title',
        'description',
        'code',
        'price',
        'stock',
        'category',
      ];
      const data = req.body;

      if (!validateRequiredFields(data, requiredFields))
        return res.status(400).json({
          success: false,
          error: `Faltan campos requeridos: ${requiredFields.join(', ')}`,
        });

      const newProduct = await productsService.create(data);
      res.status(201).json({
        success: true,
        payload: newProduct,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { pid } = req.params;

      if (!pid)
        return res.status(400).json({
          success: false,
          error: 'Falta el ID del producto',
        });

      const updatedProduct = await productsService.update(pid, req.body);
      res.status(200).json({
        success: true,
        payload: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { pid } = req.params;
      if (!pid)
        return res.status(400).json({
          success: false,
          error: 'Falta el ID del producto',
        });

      await productsService.delete(pid);

      res.status(200).json({
        success: true,
        payload: null,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
