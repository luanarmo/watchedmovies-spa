import { Base } from './Base';
import { SesionContext } from '../context/sesion.jsx';
import { useEffect, useContext, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Loading } from '../components/Loading';
import { ProfileSkeleton } from '../components/ProfileSkeleton.jsx';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBirthdayCake, FaUser } from 'react-icons/fa';
import { BiSolidMessageSquare } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

export default function Profile() {
    const { sesion } = useContext(SesionContext);
    const { profile, years, loading, updatingProfile, generatingCollage, generatingWrapped, fetchProfile, partialUpdateProfile, fetchPoster, fetchYears, fetchWrapped, setProfile } = useProfile();
    const [profileUpdated, setProfileUpdated] = useState(false);
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
        setProfileUpdated(true);
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleProfileOnChangeEvent = (e) => {
        setProfileUpdated(true);
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

        if (profileUpdated === false) {
            toast.info('No changes to update');
            return;
        }

        partialUpdateProfile(profile);
        toast.success('Profile updated successfully');
        setProfileUpdated(false);
    }


    if (loading) {
        return <Base>
            <ProfileSkeleton />
        </Base>
    }

    return (
        <Base>
            <section className="flex flex-col lg:flex-row p-6 gap-6 items-center lg:items-start justify-center min-h-screen bg-slate-950 text-white">
                <form className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-6" onSubmit={handleOnSubmit}>
                    <h2 className="text-2xl font-bold">{profile.name || 'Profile'}</h2>
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
                    <>
                        <button
                            type="submit"
                            className={profileUpdated ?
                                'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition' :
                                'bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed'}
                        >
                            {updatingProfile ? <Loading /> : 'Update profile'}
                        </button>
                        <ToastContainer />
                    </>
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
                    <h2 className="text-2xl font-bold">Posters movies collage</h2>
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
                        {generatingCollage ? <Loading /> : 'Generate Image'}
                    </button>
                </form>

                <form className="bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        fetchWrapped()
                    }}
                >
                    <h2 className="text-2xl font-bold">Wrapped Poster</h2>
                    <button
                        type='submit'
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                    >
                        {generatingWrapped ? <Loading /> : 'Generate Wrapped Poster'}
                    </button>
                </form>

            </section>

        </Base>
    );
}
