import { Base } from './Base'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { sendEmailResetPassword } from '../services/sendEmailResetPassword'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loading } from './Loading'

export function ForgotPasswordForm() {

    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        setLoading(true)
        sendEmailResetPassword({ email })
            .then(() => {
                toast.success('Email sent successfully, check your inbox')
            })
            .catch(err => {
                toast.error(err.message)
            }).finally(() => {
                e.target.reset()
                setLoading(false)
            })
    }

    return (
        <Base>
            <div className="flex flex-col items-center justify-start min-h-screen gap-4  text-white bg-slate-900 p-6 space-y-4">
                <h1 className="text-3xl font-bold">Forgot your password?</h1>
                <p className="text-gray-500">Enter your email and we will send you a link to reset your password</p>
                <form className="flex flex-col gap-4 w-full md:w-1/2 p-2" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded-md text-black" />
                    <div className='flex items-center justify-center gap-4 mt-4'>
                        <>
                            <button
                                type="submit"
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                            >
                                {loading ? <Loading /> : 'Send Email'}
                            </button>
                            <ToastContainer />
                        </>
                        <Link
                            to="/login"
                            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </Base>
    )
}
