import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container flex flex-row items-center justify-between gap-1 ">
                <div className="w-auto text-white">
                    <Link to="/">🏠</Link>
                    <Link to="/watched" className="mb-2 md:mb-0 hover:text-blue-400">Películas vistas</Link>
                </div>

                <div className="w-auto text-white flex flex-row gap-2" >
                    <Link to="/login" className="hover:text-blue-400">Iniciar sesión</Link>
                    <Link to="/register" className="hover:text-blue-400">Registrarse</Link>
                </div>
            </div>
        </nav>
    );
}
