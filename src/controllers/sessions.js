import passport from 'passport';
import { generateToken } from '../utils/passport.js';
import { loggedUserDto } from '../dtos/logged-user.js';

export const sessionsController = {
  login: (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: 'Error interno del servidor' });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: info?.message || 'Credenciales inválidas',
        });
      }

      const token = generateToken(user);

      res.status(200).json({
        success: true,
        token,
        payload: loggedUserDto.response(user),
      });
    })(req, res, next);
  },
  register: (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: 'Error interno del servidor' });
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          error: info?.message || 'Error al registrar usuario',
        });
      }

      const token = generateToken(user);

      res.status(201).json({
        success: true,
        token,
        payload: loggedUserDto.response(user),
      });
    })(req, res, next);
  },
  current: (req, res) => {
    res.status(200).json({
      success: true,
      payload: loggedUserDto.response(req.user),
    });
  },
};
