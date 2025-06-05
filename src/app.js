import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js'; // Importar las rutas de autenticación

const app = express();

app.use(morgan('dev')); // Middleware para registrar las peticiones HTTP en la consola

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON

app.use("/api",authRoutes); // Usar las rutas de autenticación

export default app; // Exportar app para que pueda ser utilizado en otros archivos