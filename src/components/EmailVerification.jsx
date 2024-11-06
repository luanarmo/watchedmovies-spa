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
            <div className="flex items-start justify-center min-h-screen bg-slate-950">
                <h1 className="text-white text-2xl p-4">
                    {loading && <strong> Verifying email...</strong>}
                    {error && <strong>{error}</strong>}
                    {success &&
                        <div className='flex flex-col items-center justify-center'>
                            <strong className='text-4xl'>Email verified!</strong>
                            <p>Now you can login with your account</p>
                            <p>Go to <Link to='/login' className='text-blue-500'>login</Link></p>
                        </div>
                    }
                </h1>
            </div>
        </Base>
    )
}