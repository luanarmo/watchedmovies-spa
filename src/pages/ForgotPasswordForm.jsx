import { Base } from '../components/Base'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { sendEmailResetPassword } from '../services/sendEmailResetPassword'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loading } from '../components/Loading'

export function ForgotPasswordForm() {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        sendEmailResetPassword({ email })
            .then(() => {
                toast.success('Email sent successfully, check your inbox')
                setEmail('')
            })
            .catch(err => {
                toast.error(err.message)
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <Base>
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <form className="flex flex-col gap-6 w-full max-w-md p-8 bg-dusty-grape-800/80 border border-dusty-grape-700 rounded-xl shadow-2xl text-dusty-grape-50" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-dusty-grape-100">Forgot your password?</h1>
                    <p className="text-dusty-grape-300">Enter your email and we will send you a link to reset your password.</p>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border bg-dusty-grape-50 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:ring-2 focus:ring-dusty-grape-500/50 focus:outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='flex items-center gap-4'>
                        <>
                            <button
                                type="submit"
                                className='flex-1 bg-dusty-grape-600 text-white px-4 py-2 rounded hover:bg-dusty-grape-500 transition-colors font-semibold'
                            >
                                {loading ? <Loading /> : 'Send Email'}
                            </button>
                            <ToastContainer />
                        </>
                        <Link
                            to="/login"
                            className='flex-1 bg-dusty-grape-700 text-dusty-grape-100 px-4 py-2 rounded hover:bg-dusty-grape-600 transition-colors text-center font-semibold'
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </Base>
    )
}
