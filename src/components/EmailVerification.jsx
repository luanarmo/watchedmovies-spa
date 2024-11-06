import { useParams } from 'react-router-dom'
import { verifyEmail } from '../services/verifyEmail'
import { useEffect, useState } from 'react'
import { Base } from './Base'
import { Link } from 'react-router-dom'

export function EmailVerification() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const { uid, token } = useParams()

    useEffect(() => {
        console.log(uid, token)
        verifyEmail({ uid, token })
            .then(() => {
                setSuccess(true)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <Base>
            <div className="flex items-center justify-center min-h-screen bg-slate-900 p-6">
                <div className="bg-slate-800 text-center p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h1 className="text-3xl font-semibold text-white mb-4">
                        {loading && <span>🔄 Verifying your email...</span>}
                        {error && <span className="text-red-400">{error}</span>}
                        {success &&
                            <div>
                                <span className="text-4xl text-green-400">✅ Email Verified!</span>
                                <p className="mt-4 text-xl text-gray-300">Your email has been successfully verified. 🎉</p>
                                <p className="mt-6 text-lg">
                                    You can now <Link to='/login' className="text-blue-400 underline">log in</Link> with your account. 🚀
                                </p>
                            </div>}
                    </h1>
                </div>
            </div>
        </Base>
    )
}
