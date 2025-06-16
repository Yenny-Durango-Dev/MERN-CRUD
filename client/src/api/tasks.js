import axios from './axios';

// obtener todas la tareas
export const getTasksRequest = () => axios.get('/tasks');

// obtener una sola tarea
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

//  crear una tarea
export const createTaskRequest = (task) => axios.post('/tasks', task);

//  actualizar una tarea
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);

//  eliminar una tarea
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);