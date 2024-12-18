import { Base } from './Base'
import { SesionContext } from '../context/sesion.jsx'
import { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/login.js'
import { PasswordField } from './PasswordField.jsx'
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReCAPTCHA from "react-google-recaptcha";
const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY

export default function Login() {

    const { sesion, setSesion } = useContext(SesionContext)

    const navigate = useNavigate();

    const [captchaValue, setCaptchaValue] = useState(null)

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const isFirstInputPass = useRef(true)
    const isFirstInputEmail = useRef(true)
    const chapchaRef = useRef(null)


    useEffect(() => {
        if (sesion.auth) {
            navigate('/')
        }
    }, [sesion.auth, navigate])

    useEffect(() => {

        if (isFirstInputEmail.current) {
            isFirstInputEmail.current = form.email === ''
            return
        }


        if (form.email.length === 0) {
            setError({
                ...error,
                email: 'The email is required'
            })
            return
        }

        if (!form.email.includes('@')) {
            setError({
                ...error,
                email: 'The email is not valid'
            })
            return
        }

        setError({
            ...error,
            email: ''
        })

    }, [form.email])

    useEffect(() => {

        if (isFirstInputPass.current) {
            isFirstInputPass.current = form.password === ''
            return
        }


        if (form.password.length === 0) {
            setError({
                ...error,
                password: 'The password is required'
            })
            return
        }

        if (form.password.length < 6) {
            setError({
                ...error,
                password: 'The password must be at least 6 characters long'
            })
            return
        }

        setError({
            ...error,
            password: ''
        })

    }, [form.password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!captchaValue) {
            toast.error('Please fill the form correctly', {
                position: "top-center",
                closeButton: true,
                autoClose: 5000,
            });
            return
        }

        if (error.email.length > 0
            || error.password.length > 0
            || isFirstInputEmail.current
            || isFirstInputPass.current
        ) {
            return
        }

        try {
            const response = await login({ ...form, token: captchaValue })

            const { exp } = jwtDecode(response.access)
            const expirationTime = exp * 1000

            setSesion({
                ...sesion,
                access: response.access,
                refresh: response.refresh,
                auth: true,
                expiresAt: expirationTime
            })
            navigate('/')

        } catch (error) {
            setCaptchaValue(null)
            chapchaRef.current.reset()

            toast.dismiss()
            toast.error(`${error.message}`, {
                position: "top-center",
                closeButton: true,
                autoClose: false,
            });
        }
    }

    return (
        <Base>
            <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-4 items-center justify-start h-screen text-white bg-slate-900'>
                <h1 className='text-4xl'><strong>Login</strong></h1>
                <input
                    type="email"
                    name='email'
                    id='email'
                    autoComplete='email'
                    placeholder="Email"
                    className='w-full md:w-1/2 p-2 border text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none'
                    onChange={handleChange}
                />
                <span className='text-red-500'>{error.email}</span>
                <PasswordField fieldHandleChange={handleChange} />
                <span className='text-red-500'>{error.password}</span>
                <ReCAPTCHA
                    ref={chapchaRef}
                    sitekey={CAPTCHA_SITE_KEY}
                    onChange={setCaptchaValue}
                />
                <div className='flex gap-4 mt-4'>
                    <>
                        <button
                            type="submit"
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                        >
                            Login
                        </button>
                        <ToastContainer />
                    </>
                    <Link
                        to="/register"
                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </Base >
    )
}