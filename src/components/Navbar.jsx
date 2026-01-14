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
        <nav className="bg-dusty-grape-950 py-3 px-4 md:py-6 md:px-8 border-b border-dusty-grape-800 shadow-md">
            <div className="container mx-auto flex flex-row items-center justify-between gap-4">
                <div className="flex items-center justify-self-center gap-1 md:gap-4 w-auto text-dusty-grape-50">
                    <Link to="/"> <FaHome title='Inicio' className="text-md md:text-3xl hover:text-dusty-grape-300 transition-colors transform hover:scale-110" /> </Link>
                    {sesion.auth && <div className='flex flex-row gap-1 md:gap-4 justify-center items-center ml-2 md:ml-4'>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-md md:text-2xl" />
                        <Link to="/watched" className="text-sm md:text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4"> Watched movies</Link>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-md md:text-2xl" />
                        <Link to="/plan" className="text-sm md:text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4"> Plan to Watch</Link>
                    </div>}
                </div>

                <div className="w-auto text-dusty-grape-50 flex flex-row gap-1 md:gap-4" >
                    {sesion.auth ?
                        <div className='flex gap-4 items-center'>
                            <Link to="/profile" className="hover:text-dusty-grape-300 transition-colors transform hover:scale-110"> <FaUser title='Profile' className="text-md md:text-2xl" /> </Link>
                            <button onClick={() => {
                                setSesion({
                                    auth: false,
                                    access: null,
                                    refresh: null
                                })
                                navigate('/')
                            }} className="hover:text-red-400 transition-colors transform hover:scale-110"> <GoSignOut title='Logout' className="text-md md:text-3xl" /> </button>
                        </div>
                        :
                        <div className="flex gap-1 md:gap-4">
                            <Link to="/login" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-dusty-grape-800 hover:bg-dusty-grape-700 transition-colors border border-dusty-grape-700 font-semibold">Login</Link>
                            <Link to="/register" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-dusty-grape-600 hover:bg-dusty-grape-500 transition-colors text-white font-semibold shadow-md">Sign up</Link>
                        </div>
                    }
                </div>
            </div>
        </nav >
    );
}
