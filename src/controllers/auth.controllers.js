import User from '../models/user.model.js'; // Importar el modelo User
import bcrypt from 'bcryptjs'; // Importar bcryptjs para encriptar la contraseña
import { createAccessToken } from '../libs/jwt.js'; // Importar la función para crear un token JWT

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

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

}

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

}