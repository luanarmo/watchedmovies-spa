import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export function PasswordField({ fieldHandleChange, fieldName = "password", fieldId = "password", placeholder = "Password" }) {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="flex flex-col items-end justify-center relative w-full">
            <input
                type={showPassword ? "text" : "password"}
                name={fieldName}
                id={fieldId}
                autoComplete='current-password'
                placeholder={placeholder}
                onChange={fieldHandleChange}
                className='w-full p-3 border bg-dusty-grape-50 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:ring-2 focus:ring-dusty-grape-500/50 focus:outline-none transition-all'
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-dusty-grape-400 hover:text-dusty-grape-600 transition-colors'
            >
                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </button>
        </div>
    )
}