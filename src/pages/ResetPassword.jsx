import { Base } from '../components/Base'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { verifyResetPassword } from '../services/verifyResetPassword'
import { useState } from 'react'
import { PasswordField } from '../components/PasswordField.jsx'
import { Loading } from '../components/Loading.jsx'
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
        setLoading(true)
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
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <form className="flex flex-col justify-center items-center gap-6 w-full max-w-md p-8 bg-dusty-grape-800/80 border border-dusty-grape-700 rounded-xl shadow-2xl text-dusty-grape-50" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-dusty-grape-100">Reset your password</h1>
                    <p className="text-dusty-grape-300">Enter your new password.</p>
                    <PasswordField fieldHandleChange={handleChange} fieldId='password' fieldName='password' placeholder='New Password' />
                    <PasswordField fieldHandleChange={handleChange} fieldId='confirm' fieldName='confirm' placeholder='Confirm Password' />
                    <div className='flex items-center gap-4 w-full'>
                        <>
                            <button
                                type="submit"
                                className='flex-1 bg-dusty-grape-600 text-white px-4 py-2 rounded hover:bg-dusty-grape-500 transition-colors font-semibold'
                            >
                                {loading ? <Loading /> : 'Reset Password'}
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