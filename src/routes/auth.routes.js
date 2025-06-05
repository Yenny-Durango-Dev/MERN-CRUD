import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router; // Exportar el router para que pueda ser utilizado en otros archivos