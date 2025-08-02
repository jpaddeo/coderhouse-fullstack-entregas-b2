import passport from 'passport';

export const requireJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!user) {
      return res.status(401).json({
        error: 'Token inválido o expirado',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export const requireRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'No tienes permisos para acceder a este recurso',
      });
    }

    next();
  };
};

export const requireAdmin = requireRoles(['admin']);
export const requireUser = requireRoles(['user', 'admin']);
