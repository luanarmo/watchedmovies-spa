import { Base } from './Base';
import { SesionContext } from '../context/sesion.jsx';
import { useEffect, useContext } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBirthdayCake, FaUser } from 'react-icons/fa';
import { BiSolidMessageSquare } from "react-icons/bi";

export default function Profile() {
    const { sesion } = useContext(SesionContext);
    const { profile, years, loading, fetchProfile, partialUpdateProfile, fetchPoster, fetchYears, setProfile } = useProfile();
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
        fetchYears();
    }, []);

    const handleGenerateImage = (payload) => {

        fetchPoster(payload);
    };

    const handleOnChangeNameEvent = (e) => {

        const { name, value } = e.target;
        console.log(name, value);
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleProfileOnChangeEvent = (e) => {

        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            profile: {
                ...prevProfile.profile,
                [name]: value
            }
        }));
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        partialUpdateProfile(profile);
    }


    return (
        <Base>
            {loading ? (
                <div className="bg-gradient-to-r from-slate-700 to-slate-500 text-white">
                    <Loading />
                </div>
            ) : (
                <section className="flex flex-col p-6 gap-6 items-center h-screen bg-slate-950 text-white">
                    <h1 className="text-4xl font-bold">{profile.name || 'Profile'}</h1>
                    <form className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-6" onSubmit={handleOnSubmit}>
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-blue-400 h-6 w-6" title='email' />
                            <h2 className="text-lg font-semibold">{profile.email}</h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaUser className="text-green-400 h-6 w-6" title='name' />
                            <input
                                id='name'
                                name='name'
                                className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                type="text" value={profile.name}
                                onChange={handleOnChangeNameEvent}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <BiSolidMessageSquare className="text-blue-400 h-6 w-6" title='biography' />
                            <input
                                id='bio'
                                name='bio'
                                className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                type="text" value={profile.profile.bio}
                                onChange={handleProfileOnChangeEvent}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <FaBirthdayCake className="text-green-400 h-6 w-6" title='birth date' />
                            <input
                                id='birth_date'
                                name='birth_date'
                                className='w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500'
                                type="date"
                                value={profile.profile.birth_date}
                                onChange={handleProfileOnChangeEvent}
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-500 transition"
                        >
                            Update profile
                        </button>
                    </form>
                    <form
                        className="bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target)
                            const payload = Object.fromEntries(formData)
                            handleGenerateImage(payload)
                        }}
                    >
                        <label htmlFor="year" className="text-lg font-medium">
                            Select Year:
                        </label>

                        <select name="year" id="year"
                            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        <label htmlFor="order" className="text-lg font-medium">
                            Order by:
                        </label>

                        <select name="order" id="order"
                            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                            <option value="-first_watched_date">Watched date (desc)</option>
                            <option value="first_watched_date">Watched date (asc)</option>
                        </select>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                        >
                            Generate Image
                        </button>
                    </form>
                </section>
            )}
        </Base>
    );
}
