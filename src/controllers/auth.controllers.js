import User from '../models/user.model.js'; // Importar el modelo User
import bcrypt from 'bcryptjs'; // Importar bcryptjs para encriptar la contraseña
import { createAccessToken } from '../libs/jwt.js'; // Importar la función para crear un token JWT
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const userFound = await User.findOne({ email }) // Buscar si el usuario ya existe en la base de datos
        if (userFound) return res.status(400).json(["El correo electrónico ya está en uso"]);// Si el usuario existe, devolver un error

        const passwordHash = await bcrypt.hash(password, 10) // Encriptar la contraseña antes de guardarla
        const newUser = new User({
            username,
            email,
            password: passwordHash // Guardar la contraseña encriptada
        });

        const userSaved = await newUser.save(); // Guardar el nuevo usuario en la base de datos
        const token = await createAccessToken({ id: userSaved._id }) // Crear un token JWT con el ID del usuario guardado
        res.cookie('token', token); // Enviar el token como una cookie
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res, status(500).json({ message: error.message }); // En caso de error, enviar un mensaje de error
    }

} // Registrar un nuevo usuario

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email }) // Buscar el usuario por email
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" }); // Si no se encuentra el usuario, enviar un mensaje de error

        const isMatch = await bcrypt.compare(password, userFound.password) // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" }); // Si las contraseñas no coinciden, enviar un mensaje de error

        const token = await createAccessToken({ id: userFound._id }) // Crear un token JWT con el ID del usuario encontrado

        res.cookie('token', token); // Enviar el token como una cookie
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res, status(500).json({ message: error.message }); // En caso de error, enviar un mensaje de error
    }

} // Iniciar sesión de un usuario existente

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0), // Expirar la cookie para cerrar sesión
    });
    return res.sendStatus(200); // Enviar un estado 200 OK para indicar que la operación fue exitosa
} // Cerrar sesión del usuario

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" }); // Si no se encuentra el usuario, enviar un mensaje de error
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}; // Obtener el perfil del usuario autenticado

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Usuario no autorizado" })
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Usuario no autorizado" });

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "Usuario no autorizado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

// Este archivo sirve para exportar las funciones de autenticación y autorización, para que puedan ser utilizadas en otras partes de la aplicación.