import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Debe ser requerido
        trim: true, // Elimina espacios en blanco al inicio y al final
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model("User", userSchema); // Exportar el modelo User para que pueda ser utilizado en otros archivos