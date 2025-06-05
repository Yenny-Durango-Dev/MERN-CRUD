import mongoose from "mongoose";

new mongoose.Schema({
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
},{
    timestamps: true,
})

export default mongoose.model("Task", taskSchema); // Exportar el modelo de tarea