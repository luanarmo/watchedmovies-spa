import { Link, useNavigate } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'
import { useContext } from 'react'
import { FaHome, FaGripLinesVertical } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";

export const Navbar = () => {

    const navigate = useNavigate()

    const { sesion, setSesion } = useContext(SesionContext)

    return (
        <nav className="bg-dusty-grape-950 py-3 px-4 border-b border-dusty-grape-800 shadow-md">
            <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex items-center justify-self-center gap-4 w-auto text-dusty-grape-50">
                    <Link to="/"> <FaHome title='Inicio' className="text-3xl hover:text-dusty-grape-300 transition-colors transform hover:scale-110" /> </Link>
                    {sesion.auth && <div className='flex flex-row gap-4 justify-center items-center ml-4'>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-2xl" />
                        <Link to="/watched" className="text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4"> Watched movies</Link>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-2xl" />
                        <Link to="/plan" className="text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4"> Plan to Watch</Link>
                    </div>}
                </div>

                <div className="w-auto text-dusty-grape-50 flex flex-row gap-4" >
                    {sesion.auth ?
                        <div className='flex gap-4 items-center'>
                            <Link to="/profile" className="hover:text-dusty-grape-300 transition-colors transform hover:scale-110"> <FaUser title='Profile' className="text-2xl" /> </Link>
                            <button onClick={() => {
                                setSesion({
                                    auth: false,
                                    access: null,
                                    refresh: null
                                })
                                navigate('/')
                            }} className="hover:text-red-400 transition-colors transform hover:scale-110"> <GoSignOut title='Logout' className="text-3xl" /> </button>
                        </div>
                        :
                        <div className="flex gap-4">
                            <Link to="/login" className="px-4 py-2 rounded-lg bg-dusty-grape-800 hover:bg-dusty-grape-700 transition-colors border border-dusty-grape-700 font-semibold">Login</Link>
                            <Link to="/register" className="px-4 py-2 rounded-lg bg-dusty-grape-600 hover:bg-dusty-grape-500 transition-colors text-white font-semibold shadow-md">Sign up</Link>
                        </div>
                    }
                </div>
            </div>
        </nav >
    );
}
