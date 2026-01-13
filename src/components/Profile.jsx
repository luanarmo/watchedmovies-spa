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
            <section className="flex flex-col lg:flex-row p-6 gap-6 items-center lg:items-start justify-center min-h-[80vh] w-full">
                <form className="bg-dusty-grape-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-6 border border-dusty-grape-700" onSubmit={handleOnSubmit}>
                    <h2 className="text-3xl font-bold text-dusty-grape-100 border-b border-dusty-grape-700 pb-2">{profile.name || 'Profile'}</h2>
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-dusty-grape-300 h-6 w-6" title='email' />
                        <h2 className="text-lg font-semibold text-dusty-grape-200">{profile.email}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaUser className="text-dusty-grape-300 h-6 w-6" title='name' />
                        <input
                            id='name'
                            name='name'
                            className="w-full px-4 py-2 rounded-lg bg-dusty-grape-700 text-dusty-grape-50 border border-dusty-grape-600 focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 transition-colors"
                            type="text" value={profile.name}
                            onChange={handleOnChangeNameEvent}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <BiSolidMessageSquare className="text-dusty-grape-300 h-6 w-6" title='biography' />
                        <input
                            id='bio'
                            name='bio'
                            className="w-full px-4 py-2 rounded-lg bg-dusty-grape-700 text-dusty-grape-50 border border-dusty-grape-600 focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 transition-colors"
                            type="text" value={profile.profile.bio}
                            onChange={handleProfileOnChangeEvent}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FaBirthdayCake className="text-dusty-grape-300 h-6 w-6" title='birth date' />
                        <input
                            id='birth_date'
                            name='birth_date'
                            className='w-full px-4 py-2 rounded-lg bg-dusty-grape-700 text-dusty-grape-50 border border-dusty-grape-600 focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 transition-colors'
                            type="date"
                            value={profile.profile.birth_date}
                            onChange={handleProfileOnChangeEvent}
                        />
                    </div>
                    <>
                        <button
                            type="submit"
                            className={profileUpdated ?
                                'bg-dusty-grape-600 text-white px-6 py-3 rounded-lg hover:bg-dusty-grape-500 transition-colors font-bold shadow-md' :
                                'bg-dusty-grape-900 text-dusty-grape-500 px-6 py-3 rounded-lg cursor-not-allowed border border-dusty-grape-800'}
                        >
                            {updatingProfile ? <Loading /> : 'Update profile'}
                        </button>
                        <ToastContainer />
                    </>
                </form>
                <form
                    className="bg-dusty-grape-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-6 border border-dusty-grape-700"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target)
                        const payload = Object.fromEntries(formData)
                        const action = e.nativeEvent.submitter.name

                        if (action === 'poster') {
                            handleGenerateImage(payload)
                        } else if (action === 'wrapped') {
                            fetchWrapped({ year: payload.year })
                        }
                    }}
                >
                    <h2 className="text-2xl font-bold text-dusty-grape-100 border-b border-dusty-grape-700 pb-2">Generators</h2>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="year" className="text-lg font-medium text-dusty-grape-200">
                            Select Year:
                        </label>

                        <select name="year" id="year"
                            className="w-full px-4 py-2 rounded-lg bg-dusty-grape-700 text-dusty-grape-50 border border-dusty-grape-600 focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 cursor-pointer"
                        >
                            {years.map((year) => (
                                <option key={year} value={year} className="bg-dusty-grape-800">{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="order" className="text-lg font-medium text-dusty-grape-200">
                            Order by:
                        </label>

                        <select name="order" id="order"
                            className="w-full px-4 py-2 rounded-lg bg-dusty-grape-700 text-dusty-grape-50 border border-dusty-grape-600 focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 cursor-pointer"
                        >
                            <option value="-first_watched_date" className="bg-dusty-grape-800">Watched date (desc)</option>
                            <option value="first_watched_date" className="bg-dusty-grape-800">Watched date (asc)</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button
                            type="submit"
                            name="poster"
                            className="flex-1 px-4 py-2 bg-dusty-grape-600 text-white rounded-lg hover:bg-dusty-grape-500 transition-colors shadow-md font-semibold"
                        >
                            {generatingCollage ? <Loading /> : 'Generate Poster'}
                        </button>
                        <button
                            type='submit'
                            name="wrapped"
                            className="flex-1 px-4 py-2 bg-dusty-grape-500 text-white rounded-lg hover:bg-dusty-grape-400 transition-colors shadow-md font-semibold"
                        >
                            {generatingWrapped ? <Loading /> : 'Generate Wrapped'}
                        </button>
                    </div>
                </form>

            </section>

        </Base>
    );
}
