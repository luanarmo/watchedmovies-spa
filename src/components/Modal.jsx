import { FaWindowClose } from 'react-icons/fa';


export function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null
    }


    return (
        <div className="fixed z-50 inset-0 bg-dusty-grape-950/80 backdrop-blur-sm overflow-y-auto w-auto h-auto flex justify-center items-center">
            <div className="bg-dusty-grape-800/90 text-dusty-grape-50 p-4 rounded-xl border border-dusty-grape-700 shadow-xl shadow-dusty-grape-950/50">
                <button className="text-dusty-grape-400 hover:text-red-400 transition-colors" onClick={onClose}>
                    <FaWindowClose />
                </button>
                {children}
            </div>
        </div>
    )
}
