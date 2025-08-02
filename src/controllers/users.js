import { loggedUserDto } from '../dtos/logged-user.js';

import { usersService } from '../services/index.js';

export const usersController = {
  getAll: async (req, res) => {
    try {
      const users = await usersService.getAll(req.query);
      res.status(200).json({
        success: true,
        payload: users,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { uid } = req.params;

      if (!uid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del usuario' });

      if (req.user.role !== 'admin' && req.user._id.toString() !== uid) {
        return res.status(403).json({
          success: false,
          error: 'No tienes permisos para acceder a este recurso',
        });
      }

      const user = await usersService.getById(uid);
      res.status(200).json({
        success: true,
        payload: user,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const user = await usersService.create(req.body);
      res.status(201).json({
        success: true,
        payload: user,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { uid } = req.params;

      if (!uid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del usuario' });

      if (req.user.role !== 'admin' && req.user._id.toString() !== uid) {
        return res.status(403).json({
          success: false,
          error: 'No tienes permisos para acceder a este recurso',
        });
      }

      const user = await usersService.update(uid, req.body);
      res.status(200).json({
        success: true,
        payload: user,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { uid } = req.params;

      if (!uid)
        return res
          .status(400)
          .json({ success: false, error: 'Falta el ID del usuario' });

      const response = await usersService.deleted(uid);

      res.status(200).json({
        success: true,
        payload: response,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
