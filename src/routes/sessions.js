import { Router } from 'express';

import { requireJWT } from '../middlewares/auth.js';
import { sessionsController } from '../controllers/sessions.js';

const router = Router();

router.post('/login', sessionsController.login);
router.post('/register', sessionsController.register);
router.get('/current', requireJWT, sessionsController.current);

export default router;
