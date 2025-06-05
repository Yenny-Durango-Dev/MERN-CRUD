import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'; // Importar jsonwebtoken para manejar tokens JWT

// Crear un token JWT
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        TOKEN_SECRET, // Clave secreta para firmar el token
        {
            expiresIn: '1d' // El token expirará en 1 dia
        },
        (err, token) => {
            if (err) reject(err); // Rechazar la promesa si hay un error al generar el token
            resolve(token); // Resolver la promesa con el token generado
        }
    );
  });
}
