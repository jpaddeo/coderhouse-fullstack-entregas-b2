import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { usersService } from '../services/index.js';

import CONFIG from './config.js';

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false, {
            message: 'Email y contraseña son requeridos',
          });
        }
        const user = await usersService.authenticateUser(email, password);
        return done(null, user);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  )
);

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await usersService.getById(payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age, role } = req.body;

        const userData = {
          first_name,
          last_name,
          email,
          age,
          password,
          role: role || 'user',
        };

        const newUser = await usersService.create(userData);
        return done(null, newUser);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersService.getById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    CONFIG.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, CONFIG.JWT_SECRET);
};

export default passport;
