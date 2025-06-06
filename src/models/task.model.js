import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencia al modelo de usuario
        required: true, // Campo obligatorio
    }
},{
    timestamps: true,
});

export default mongoose.model("Task", taskSchema); // Exportar el modelo de tarea