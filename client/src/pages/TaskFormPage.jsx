import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc)

function TaskFormPage() {

  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task)
        setValue('title', task.title);
        setValue('description', task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"))
      }
    }
    loadTask()
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }

    if (data.date) dataValid.date = dayjs.utc(data.date).format();

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate('/tasks')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Titulo" {...register("title")} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" autoFocus />

          <label htmlFor="description">Description</label>
          <textarea name="" id="" rows="3" placeholder="Descripcion" {...register("description")} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" ></textarea>
          <label htmlFor="date">Date</label>
          <input type="date" {...register('date')} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage
