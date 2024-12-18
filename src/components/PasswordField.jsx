import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export function PasswordField({ fieldHandleChange, fieldName = "password", fieldId = "password", placeholder = "Password" }) {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className=" flex flex-col items-end justify-center relative w-full md:w-1/2">
            <input
                type={showPassword ? "text" : "password"}
                name={fieldName}
                id={fieldId}
                autoComplete='current-password'
                placeholder={placeholder}
                onChange={fieldHandleChange}
                className='w-full p-2 border text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none'
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute h-3/5 w-5 m-1 text-sm bg-white text-black rounded'
            >
                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </button>
        </div>
    )
}