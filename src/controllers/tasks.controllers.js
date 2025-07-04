import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
} // Obtener todas las tareas

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id 
        });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
} // Crear una nueva tarea

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if (!task) return res.status(404).json({ message: 'Task not found' })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
} // Obtener una tarea por ID

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Task not found' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });

    }
} // Eliminar una tarea por ID

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) return res.status(404).json({ message: 'Task not found' })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
} // Actualizar una tarea por ID
