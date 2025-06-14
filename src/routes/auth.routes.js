import { Router } from "express";
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js"; // Importar el middleware de autenticación
import { validateSchema } from "../middlewares/validator.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

export default router; // Exportar el router para que pueda ser utilizado en otros archivos

// Este archivo sirve para configurar las rutas de autenticación para la aplicación. Los métodos GET, POST, PUT, DELETE, etc. se definen aquí. Por ejemplo, para crear una ruta que permita el registro de un usuario, se puede utilizar el método POST y el path '/register'.