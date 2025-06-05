import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // Middleware para registrar las peticiones HTTP en la consola

export default app; // Exportar app para que pueda ser utilizado en otros archivos