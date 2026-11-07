import { Base } from '../components/Base';
import { SessionContext } from '../context/session.jsx';
import { useEffect, useContext, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Loading } from '../components/Loading';
import { ProfileSkeleton } from '../components/ProfileSkeleton.jsx';
import { useNavigate } from 'react-router-dom';
import { GoSignOut } from "react-icons/go";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const labelClass = 'text-xs md:text-sm font-medium uppercase tracking-wider text-dusty-grape-300'
const fieldClass = 'w-full min-h-[44px] px-4 py-2 text-base rounded-full text-dusty-grape-50 bg-dusty-grape-700 border border-dusty-grape-700 hover:bg-dusty-grape-600 transition-colors focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 placeholder-dusty-grape-400'
const cardClass = 'bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-4 md:p-6 flex flex-col gap-4 md:gap-5 min-w-0'

export default function Profile() {
    const { session, deleteExpiredSession } = useContext(SessionContext);
    const { profile, years, loading, updatingProfile, generatingCollage, generatingWrapped, fetchProfile, partialUpdateProfile, fetchPoster, fetchYears, fetchWrapped, setProfile } = useProfile();
    const [profileUpdated, setProfileUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isExpired = () => {
            return session.expiresAt ? Date.now() > session.expiresAt : true;
        };

        if (isExpired()) {
            deleteExpiredSession()
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
            <div className="mx-auto flex flex-col gap-4 md:gap-6 p-4 w-full max-w-5xl min-h-screen">
                {/* Header, same bar as Watched and Statistics */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4 md:bg-dusty-grape-800/50 md:p-4 md:rounded-xl md:border md:border-dusty-grape-700 md:backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-dusty-grape-100">Profile</h2>
                    <span className="hidden md:block text-sm text-dusty-grape-300">{profile.email}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-start">
                    <form className={`${cardClass} md:flex-1`} onSubmit={handleOnSubmit}>
                        <div className="flex items-center gap-4">
                            <div
                                aria-hidden="true"
                                className="flex-none h-14 w-14 md:h-16 md:w-16 rounded-full bg-dusty-grape-600 text-dusty-grape-50 flex items-center justify-center text-2xl md:text-3xl font-bold"
                            >
                                {(profile.name || profile.email || '?').charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-lg md:text-xl font-bold text-dusty-grape-50 break-words">{profile.name || 'Profile'}</span>
                                <span className="text-sm text-dusty-grape-300 break-all">{profile.email}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className={labelClass}>Name</label>
                            <input
                                id='name'
                                name='name'
                                className={fieldClass}
                                type="text" value={profile.name}
                                onChange={handleOnChangeNameEvent}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="bio" className={labelClass}>Bio</label>
                            <input
                                id='bio'
                                name='bio'
                                className={fieldClass}
                                type="text" value={profile.profile.bio}
                                onChange={handleProfileOnChangeEvent}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="birth_date" className={labelClass}>Birth date</label>
                            <input
                                id='birth_date'
                                name='birth_date'
                                className={fieldClass}
                                type="date"
                                value={profile.profile.birth_date}
                                onChange={handleProfileOnChangeEvent}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`min-h-[44px] px-6 rounded-full font-bold md:self-start transition-colors ${profileUpdated ?
                                'bg-coral text-dusty-grape-900 hover:opacity-90' :
                                'bg-dusty-grape-900 text-dusty-grape-500 cursor-not-allowed border border-dusty-grape-800'}`}
                        >
                            {updatingProfile ? <Loading /> : 'Update profile'}
                        </button>
                        <ToastContainer />
                    </form>

                    <form
                        className={`${cardClass} md:flex-1`}
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
                        <div className="flex flex-col gap-1">
                            <span className={labelClass}>Generators</span>
                            <span className="text-sm text-dusty-grape-400">Build a poster collage or your yearly wrapped from what you watched.</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="year" className={labelClass}>Year</label>
                            <select name="year" id="year" className={`${fieldClass} cursor-pointer`}>
                                {years.map((year) => (
                                    <option key={year} value={year} className="bg-dusty-grape-800">{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="order" className={labelClass}>Order by</label>
                            <select name="order" id="order" className={`${fieldClass} cursor-pointer`}>
                                <option value="-first_watched_date" className="bg-dusty-grape-800">Watched date (desc)</option>
                                <option value="first_watched_date" className="bg-dusty-grape-800">Watched date (asc)</option>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                name="poster"
                                className="flex-1 min-h-[44px] px-4 rounded-full bg-dusty-grape-600 text-white hover:bg-dusty-grape-500 transition-colors font-semibold"
                            >
                                {generatingCollage ? <Loading /> : 'Generate poster'}
                            </button>
                            <button
                                type='submit'
                                name="wrapped"
                                className="flex-1 min-h-[44px] px-4 rounded-full border border-coral text-coral hover:bg-coral/10 transition-colors font-semibold"
                            >
                                {generatingWrapped ? <Loading /> : 'Generate wrapped'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Below lg the navbar is gone, so the logout lives here; on desktop it is in the navbar */}
                <button
                    type="button"
                    onClick={() => {
                        deleteExpiredSession()
                        navigate('/')
                    }}
                    className="lg:hidden w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-red-400/60 text-red-400 font-semibold hover:bg-dusty-grape-800 transition-colors"
                >
                    <GoSignOut aria-hidden='true' /> Sign out
                </button>
            </div>
        </Base>
    );
}
