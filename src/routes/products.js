import { Router } from 'express';

import { requireJWT, requireAdmin } from '../middlewares/auth.js';

import { productsController } from '../controllers/products.js';

const router = Router();

// Obtener todos los productos (público)
router.get('/', productsController.getAll);

// Obtener un producto por ID (público)
router.get('/:pid', productsController.get);

// Crear nuevo producto (solo admin)
router.post('/', requireJWT, requireAdmin, productsController.create);

// Actualizar producto (solo admin)
router.put('/:pid', requireJWT, requireAdmin, productsController.update);

// Eliminar producto (solo admin)
router.delete('/:pid', requireJWT, requireAdmin, productsController.delete);

export default router;
