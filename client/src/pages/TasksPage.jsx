import { useAuth } from "../context/AuthContext"

function TasksPages() {
const {user} = useAuth()
console.log(user)

  return (
    <div>
      <h1>Tareas</h1>
    </div>
  )
}

export default TasksPages
