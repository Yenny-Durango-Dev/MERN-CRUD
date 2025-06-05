import User from '../models/user.model.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const newUser = new User({
            email,
            password,
            username
        })
        await newUser.save();
        res.send("Registrando");
    } catch (error) {
        console.log(error);
    }

}

export const login = (req, res) => res.send("login");