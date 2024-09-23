import { FaWindowClose } from 'react-icons/fa';


export function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null
    }


    return (
        <div className="fixed z-50 inset-0 bg-transparent overflow-y-auto w-auto h-auto flex justify-center items-center">
            <div className="bg-slate-700 bg-opacity-80 text-white p-4 rounded-xl">
                <button className="text-red-500" onClick={onClose}>
                    <FaWindowClose />
                </button>
                {children}
            </div>
        </div>
    )
}
