import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <h1>Loading ...</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;

    return <Outlet />;
}

export default ProtectedRoute;

// Este archivo sirve para proteger las rutas que se encuentran dentro de este componente, si el usuario no está autenticado, se redirige a la ruta de login, si está autenticado, se muestra el contenido de la ruta protegida.