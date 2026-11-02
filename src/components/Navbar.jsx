import { Link, useNavigate } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'
import { useContext } from 'react'
import { FaHome, FaGripLinesVertical } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";

export const Navbar = () => {

    const navigate = useNavigate()

    const { sesion, deleteSesionExpiredSession } = useContext(SesionContext)

    return (
        // With a session, below lg the bottom tab bar replaces the navbar (Home is "Explore", logout lives in Profile)
        <nav className={`${sesion.auth ? 'hidden lg:block' : ''} bg-dusty-grape-950 py-3 px-4 md:py-6 md:px-8 border-b border-dusty-grape-800 shadow-md`}>
            <div className="container mx-auto flex flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-x-4 gap-y-2">
                {/* below lg: Home joins the top row and the links drop to their own row (display: contents) */}
                <div className="contents lg:flex items-center gap-1 md:gap-4 w-auto text-dusty-grape-50">
                    <Link to="/" aria-label="Home" className="flex items-center justify-center min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0"> <FaHome title='Inicio' className="text-2xl md:text-3xl hover:text-dusty-grape-300 transition-colors transform hover:scale-110" /> </Link>
                    {sesion.auth && <div className='hidden lg:flex flex-row flex-wrap lg:flex-nowrap order-last w-full lg:order-none lg:w-auto gap-1 md:gap-4 justify-center items-center text-dusty-grape-50 lg:ml-4'>
                        <FaGripLinesVertical className="hidden lg:block text-dusty-grape-600 text-md md:text-2xl" />
                        <Link to="/watched" className="text-sm md:text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4"> Watched movies</Link>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-md md:text-2xl" />
                        <Link to="/plan" className="text-sm md:text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4"> Plan to Watch</Link>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-md md:text-2xl" />
                        <Link to="/stats" className="text-sm md:text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4">Statistics</Link>
                        <FaGripLinesVertical className="text-dusty-grape-600 text-md md:text-2xl" />
                        <Link to="/tier-list" className="text-sm md:text-lg font-medium hover:text-dusty-grape-300 transition-colors hover:underline underline-offset-4">Tier List</Link>
                    </div>}
                </div>

                <div className="w-auto text-dusty-grape-50 flex flex-row gap-1 md:gap-4" >
                    {sesion.auth ?
                        <div className='flex gap-4 items-center'>
                            {/* Below lg the profile lives in the bottom tab bar */}
                            <Link to="/profile" className="hidden lg:block hover:text-dusty-grape-300 transition-colors transform hover:scale-110"> <FaUser title='Profile' className="text-md md:text-2xl" /> </Link>
                            <button aria-label="Logout" onClick={() => {
                                deleteSesionExpiredSession()
                                navigate('/')
                            }} className="flex items-center justify-center min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0 hover:text-red-400 transition-colors transform hover:scale-110"> <GoSignOut title='Logout' className="text-2xl md:text-3xl" /> </button>
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
