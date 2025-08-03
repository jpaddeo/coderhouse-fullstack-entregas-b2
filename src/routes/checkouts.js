import { Router } from 'express';

import { requireJWT, requireUser } from '../middlewares/auth.js';

import { checkoutsController } from '../controllers/checkouts.js';

const router = Router();

router.get('/:tid', requireJWT, requireUser, checkoutsController.get);
router.post('/', requireJWT, requireUser, checkoutsController.create);

export default router;
