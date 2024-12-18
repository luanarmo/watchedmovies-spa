import { Base } from './Base'
import { SesionContext } from '../context/sesion.jsx'
import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register } from '../services/register.js'
import { PasswordField } from './PasswordField.jsx'
import ReCAPTCHA from "react-google-recaptcha";
const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY

export default function Register() {

    const { sesion } = useContext(SesionContext)

    const navigate = useNavigate();

    const [captchaValue, setCaptchaValue] = useState(null);

    const [error, setError] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const isFirstInputPass = useRef(true)
    const isFirstInputEmail = useRef(true)
    const isFirstInputConfirmPass = useRef(true)
    const captchaRef = useRef(null)

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
                password: 'The password must be at least 6 characters'
            })
            return
        }

        setError({
            ...error,
            password: ''
        })

    }, [form.password])

    useEffect(() => {

        if (isFirstInputConfirmPass.current) {
            isFirstInputConfirmPass.current = form.confirmPassword === ''
            return
        }

        if (form.confirmPassword.length === 0) {
            setError({
                ...error,
                confirmPassword: 'The password is required'
            })
            return
        }

        if (form.password !== form.confirmPassword) {
            setError({
                ...error,
                confirmPassword: 'The password does not match'
            })
            return
        }

        setError({
            ...error,
            confirmPassword: ''
        })

    }, [form.confirmPassword, form.password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!captchaValue) {
            toast.dismiss()
            toast.error('Please complete the captcha', {
                position: "top-center",
                closeButton: true,
                autoClose: false,
            })
            return
        }

        if (
            error.email.length > 0
            || error.password.length > 0
            || error.confirmPassword.length > 0
            || isFirstInputEmail.current
            || isFirstInputPass.current
            || isFirstInputConfirmPass.current
        ) {
            return
        }

        try {
            await register({ ...form, token: captchaValue })
            navigate('/verifyEmail')
        } catch (error) {
            setCaptchaValue(null)
            captchaRef.current.reset()

            toast.dismiss()
            toast.error(error.message, {
                position: "top-center",
                closeButton: true,
                autoClose: false,
            })
        }
    }

    return (
        <Base>
            <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-4 items-center justify-start h-screen text-white bg-slate-900'>
                <h1 className='text-4xl'><strong>Sign up</strong></h1>
                <input
                    type="text"
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
                <PasswordField fieldHandleChange={handleChange} fieldName='confirmPassword' fieldId='confirmPassword' placeholder='Confirm Password' />
                <span className='text-red-500'>{error.confirmPassword}</span>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={CAPTCHA_SITE_KEY}
                    onChange={setCaptchaValue}
                />
                <div className='flex gap-4 mt-4'>
                    <>
                        <button
                            type="submit"
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                        >
                            Sign up
                        </button>
                        <ToastContainer />
                    </>
                    <Link
                        to="/login"
                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    >
                        Login
                    </Link>
                </div>
            </form>
        </Base>
    )
}

