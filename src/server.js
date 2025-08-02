import express from 'express';
import mongoose from 'mongoose';

import CONFIG from './utils/config.js';

import passport from './utils/passport.js';

import sessionsRoutes from './routes/sessions.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';
import checkoutsRoutes from './routes/checkouts.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

mongoose
  .connect(CONFIG.MONGODB_URI || 'mongodb://localhost:27017/mydb', {})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

app.use('/api/sessions', sessionsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/checkouts', checkoutsRoutes);

app.get('/api/status', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    timestamp: new Date().getTime(),
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(CONFIG.PORT, () => {
  console.log(`Servidor corriendo en puerto ${CONFIG.PORT}`);
});

export default app;
