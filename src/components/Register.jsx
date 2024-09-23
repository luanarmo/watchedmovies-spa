import { Base } from './Base'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <Base>
            {/* <form className='flex flex-col p-4 gap-4 items-center justify-start h-screen text-white bg-slate-900'>
                <h1 className='text-4xl'><strong>Registrarse</strong></h1>
                <input
                    type="text"
                    placeholder="Correo"
                    className='w-full p-2 border border-gray-500 rounded focus:border-blue-500 focus:outline-none'
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className='w-full p-2 border border-gray-500 rounded focus:border-blue-500 focus:outline-none'
                />
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className='w-full p-2 border border-gray-500 rounded focus:border-blue-500 focus:outline-none'
                />
                <div className='flex gap-4 mt-4'>
                    <button
                        type="submit"
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                    >
                        Registrarse
                    </button>
                    <Link
                        to="/login"
                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </form> */}
            <div className="flex items-center justify-center h-screen text-white bg-slate-900">
                <h1 className="text-white text-4xl p-4">
                    <strong>Work in progress! 🚧</strong>
                </h1>
            </div>
        </Base>
    )
}

