# Entrega FINAL - Backend II : Diseño y Arquitectura

[CONSIGNA](CONSIGNA.md)

## Autenticación y autorización

Acorde a la consigna se implementó Passport.js con las siguientes estrategias:

- **Local Strategy**: Para login y registro con email/contraseña
- **JWT Strategy**: Para proteger rutas con tokens JWT

### Detalle Estrategias Implementadas

#### 1. **Local Strategy (Login)**

- **Endpoint**: `POST /api/auth/login`
- **Campos**: `email`, `password`
- **Respuesta**: Token JWT + datos del usuario

#### 2. **Local Strategy (Registro)**

- **Endpoint**: `POST /api/auth/register`
- **Campos**: `first_name`, `last_name`, `email`, `age`, `password`, `role` (opcional)
- **Respuesta**: Token JWT + datos del usuario

#### 3. **JWT Strategy**

- **Uso**: Proteger rutas que requieren autenticación
- **Header**: `Authorization: Bearer <token>`

### Middlewares de Autenticación

#### `requireJWT`

Verifica que el token JWT sea válido y extrae los datos del usuario.

#### `requireAdmin`

Verifica que el usuario tenga rol de administrador.

#### `requireUser`

Verifica que el usuario tenga rol de usuario o administrador.

#### `requireRoles(roles)`

Middleware personalizable para verificar roles específicos.

### Flujo de Autenticación

1. **Registro**: Usuario se registra → Contraseña se encripta → Token JWT generado
2. **Login**: Usuario hace login → Contraseña verificada → Token JWT generado
3. **Acceso Protegido**: Cliente envía token → Token verificado → Acceso concedido
4. **Autorización**: Verificación de roles antes de acceder a recursos

### Roles Disponibles

- **user**: Usuario normal (valor por defecto)
- **admin**: Administrador con permisos completos

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno (crear `.env` basado en `.env.example`)

3. Iniciar el servidor:

```bash
# modo desarrollo
npm run dev

# modo ejecucion
npm run start
```

## Notas Importantes

- Los tokens JWT expiran en 1 hora (a futuro podría sacarse del .env).
- Las contraseñas se almacenan hasheadas con bcrypt.
- Los emails deben ser únicos.
- Los errores de autenticación se manejan de forma segura sin revelar información sensible.
