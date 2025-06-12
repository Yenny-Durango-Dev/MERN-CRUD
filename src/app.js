import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from './routes/auth.routes.js'; // Importar las rutas de autenticación
import taskRoutes from './routes/tasks.routes.js'; // Importar las rutas de tareas

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev')); // Middleware para registrar las peticiones HTTP en la consola

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON

app.use(cookieParser()); // Middleware para parsear las cookies de las peticiones

app.use("/api", authRoutes); // Usar las rutas de autenticación
app.use("/api", taskRoutes); // Usar las rutas de autenticación

export default app; // Exportar app para que pueda ser utilizado en otros archivos