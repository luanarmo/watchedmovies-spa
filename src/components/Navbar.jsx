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
        <nav className="bg-gray-800 p-4">
            <div className="flex flex-row items-center justify-between gap-1">
                <div className="flex items-center justify-self-center gap-1  w-auto text-white">
                    <Link to="/"> <FaHome title='Inicio' /> </Link>
                    {sesion.auth && <div className='flex flex-row gap-1 justify-center items-center'>
                        <FaGripLinesVertical />
                        <Link to="/watched" className=" hover:text-blue-400"> Watched movies</Link>
                    </div>}
                </div>

                <div className="w-auto text-white flex flex-row gap-2" >
                    {sesion.auth ?
                        <div className='flex gap-2 items-center'>
                            <Link to="/profile" className="hover:text-blue-400"> <FaUser title='Profile' /> </Link>
                            <button onClick={() => {
                                setSesion({
                                    auth: false,
                                    access: null,
                                    refresh: null
                                })
                                navigate('/')
                            }} className="hover:text-blue-400"> <GoSignOut title='Logout' /> </button>
                        </div>
                        :
                        <>
                            <Link to="/login" className="hover:text-blue-400">Login</Link>
                            <Link to="/register" className="hover:text-blue-400">Sign up</Link>
                        </>
                    }
                </div>
            </div>
        </nav >
    );
}
