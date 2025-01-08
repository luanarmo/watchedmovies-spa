import { Base } from './Base'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { verifyResetPassword } from '../services/verifyResetPassword'
import { useState } from 'react'
import { PasswordField } from './PasswordField.jsx'
import { Loading } from './Loading.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export function ResetPassword() {

    const [loading, setLoading] = useState(false)

    const { uid, token } = useParams()

    const [form, setForm] = useState({
        uid: uid,
        token: token,
        password: '',
        confirm: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        verifyResetPassword(form)
            .then(() => {
                toast.success('Password reset successfully, you can now login')
            })
            .catch(err => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }


    return (
        <Base>
            <div className="flex flex-col items-center justify-start min-h-screen gap-4  text-white bg-slate-900 p-6 space-y-4">
                <h1 className="text-3xl font-bold">Reset your password</h1>
                <p className="text-gray-500">Enter your new password</p>
                <form className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 p-2" onSubmit={handleSubmit}>
                    <PasswordField fieldHandleChange={handleChange} fieldId='password' fieldName='password' placeholder='New Password' />
                    <PasswordField fieldHandleChange={handleChange} fieldId='confirm' fieldName='confirm' placeholder='Confirm Password' />
                    <div className='flex items-center justify-center gap-4 mt-4'>
                        <>
                            <button
                                type="submit"
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                            >
                                {loading ? <Loading /> : 'Reset Password'}
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