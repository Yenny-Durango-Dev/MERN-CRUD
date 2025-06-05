import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js"; // Importar el middleware de autenticación
const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router; // Exportar el router para que pueda ser utilizado en otros archivos