import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
   const {token} = req.cookies;
   if(!token)
    return res.status(401).json({message: "No token provided, please login first."});

   jwt.verify(token,TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({message: "Invalid token."});

    req.user = user; // guardar la información del usuario en el objeto de solicitud

    next();
   })
}