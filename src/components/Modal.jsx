import { FaTimes } from 'react-icons/fa';

// Bottom sheet below md (reachable with the thumb), centered dialog from md up
export function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed z-50 inset-0 bg-dusty-grape-950/80 backdrop-blur-sm overflow-y-auto flex justify-center items-end md:items-center">
            <div role="dialog" aria-modal="true" className="relative w-full md:w-auto max-h-[92vh] overflow-y-auto bg-dusty-grape-900 md:bg-dusty-grape-800/90 text-dusty-grape-50 px-5 pt-3 pb-6 md:p-4 rounded-t-3xl md:rounded-xl border-t md:border border-dusty-grape-700 shadow-xl shadow-dusty-grape-950/50">
                <div className="md:hidden w-10 h-1 rounded-full bg-dusty-grape-700 mx-auto mb-2" aria-hidden="true"></div>
                <button
                    aria-label="Close"
                    className="absolute top-2 right-3 md:static flex items-center justify-center w-11 h-11 md:w-auto md:h-auto rounded-full bg-dusty-grape-800 md:bg-transparent text-dusty-grape-100 md:text-dusty-grape-400 hover:text-red-400 transition-colors"
                    onClick={onClose}
                >
                    <FaTimes aria-hidden="true" />
                </button>
                {children}
            </div>
        </div>
    )
}
