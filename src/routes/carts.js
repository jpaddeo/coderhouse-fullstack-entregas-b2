import { Router } from 'express';

import { requireJWT, requireUser } from '../middlewares/auth.js';

import { cartsController } from '../controllers/carts.js';

const router = Router();

router.get('/', requireJWT, requireUser, cartsController.getAll);

router.get('/:cid', requireJWT, requireUser, cartsController.get);

router.post('/', requireJWT, requireUser, cartsController.create);

router.put('/:cid', requireJWT, requireUser, cartsController.update);

router.delete('/:cid', requireJWT, requireUser, cartsController.delete);

router.post(
  '/:cid/product/:pid',
  requireJWT,
  requireUser,
  cartsController.addProductById
);

router.put(
  '/:cid/product/:pid',
  requireJWT,
  requireUser,
  cartsController.updateProductById
);

router.delete(
  '/:cid/product/:pid',
  requireJWT,
  requireUser,
  cartsController.deleteProductById
);

export default router;
