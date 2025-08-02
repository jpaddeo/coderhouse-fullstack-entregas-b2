import { Router } from 'express';

import { requireJWT, requireAdmin } from '../middlewares/auth.js';

import { usersController } from '../controllers/users.js';

const router = Router();

// Obtener todos los usuarios (solo admin)
router.get('/', requireJWT, requireAdmin, usersController.getAll);

// Crear nuevo usuario (solo admin)
router.post('/', requireJWT, requireAdmin, usersController.create);

// Obtener usuario por ID (solo admin o el mismo usuario)
router.get('/:uid', requireJWT, usersController.get);

// Actualizar usuario (solo admin o el mismo usuario)
router.put('/:uid', requireJWT, usersController.update);

// Eliminar usuario (solo admin)
router.delete('/:uid', requireJWT, requireAdmin, usersController.delete);

export default router;
