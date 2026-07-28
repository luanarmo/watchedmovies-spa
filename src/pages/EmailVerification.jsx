import { useParams } from 'react-router-dom'
import { verifyEmail } from '../services/verifyEmail'
import { useEffect, useState } from 'react'
import { Base } from '../components/Base'
import { Link } from 'react-router-dom'

export function EmailVerification() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const { uid, token } = useParams()

    useEffect(() => {
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
            <div className="flex items-center justify-center min-h-screen p-6">
                <div className="bg-dusty-grape-800/80 border border-dusty-grape-700 text-center p-8 rounded-xl shadow-2xl w-full max-w-lg">
                    <h1 className="text-3xl font-semibold text-dusty-grape-100 mb-4">
                        {loading && <span>Verifying your email...</span>}
                        {error && <span className="text-red-400">{error}</span>}
                        {success &&
                            <div>
                                <span className="text-4xl text-green-400">Email Verified!</span>
                                <p className="mt-4 text-xl text-dusty-grape-200">Your email has been successfully verified.</p>
                                <p className="mt-6 text-lg text-dusty-grape-50">
                                    You can now <Link to='/login' className="text-dusty-grape-300 hover:text-dusty-grape-100 underline transition-colors">log in</Link> with your account.
                                </p>
                            </div>}
                    </h1>
                </div>
            </div>
        </Base>
    )
}
