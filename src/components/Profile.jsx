import { Base } from './Base';
import { SesionContext } from '../context/sesion.jsx';
import { useEffect, useContext } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import { BiSolidMessageSquare } from "react-icons/bi";

export default function Profile() {
    const { sesion } = useContext(SesionContext);
    const { profile, loading, fetchProfile, fetchPoster } = useProfile();
    const navigate = useNavigate();

    useEffect(() => {
        const isExpired = () => {
            return sesion.expiresAt ? Date.now() > sesion.expiresAt : true;
        };

        if (isExpired()) {
            sesion.auth = false
            navigate('/login');
        }
        fetchProfile();
    }, []);

    const handleGenerateImage = () => {
        console.log(`Generating image for year`);
        fetchPoster();
    };

    return (
        <Base>
            {loading ? (
                <div className="bg-gradient-to-r from-slate-700 to-slate-500 text-white">
                    <Loading />
                </div>
            ) : (
                <div className="flex flex-col p-6 gap-6 items-center h-screen bg-slate-950 text-white">
                    <h1 className="text-4xl font-bold">{profile.name || 'Profile'}</h1>
                    <section className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-blue-400 h-6 w-6" title='email' />
                            <h2 className="text-lg font-semibold">{profile.email}</h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <BiSolidMessageSquare className="text-green-400 h-6 w-6" title='biography' />
                            <h2 className="text-lg font-semibold">{profile.profile.bio}</h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaBirthdayCake className="text-yellow-400 h-6 w-6" title='birth date' />
                            <h2 className="text-lg font-semibold">{profile.profile.birth_date}</h2>
                        </div>
                    </section>
                    <form
                        className="bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleGenerateImage();
                        }}
                    >
                        <label htmlFor="year" className="text-lg font-medium">
                            Select Year
                        </label>
                        <select name="" id=""
                            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                        >
                            Generate Image
                        </button>
                    </form>
                </div>
            )}
        </Base>
    );
}
