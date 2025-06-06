import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id // Filtrar las tareas por el ID del usuario autenticado
    }).populate('user')
    res.json(tasks)
} // Obtener todas las tareas

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id // Asignar el ID del usuario autenticado
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
} // Crear una nueva tarea

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user')
    // Buscar una tarea por su ID y poblar el campo 'user' con los datos del usuario
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
} // Obtener una tarea por ID

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    return res.sendStatus(204)
} // Eliminar una tarea por ID

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
} // Actualizar una tarea por ID
