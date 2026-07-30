import { useState } from 'react'

export function ViewDetailsForm({ movie, onClose, onSubmit }) {
    const [rating, setRating] = useState('')
    const [showDetails, setShowDetails] = useState(false)

    const getCurrentDate = () => new Date().toISOString().split('T')[0]

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        if (rating) {
            payload.rating = rating
        } else {
            delete payload.rating
        }

        onSubmit({ payload, movie })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
            <div className="flex items-center gap-3 pb-3 border-b border-dusty-grape-700">
                {movie.poster_url && (
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-10 h-auto rounded shadow"
                    />
                )}
                <div>
                    <p className="text-xs text-dusty-grape-400 uppercase tracking-wide">Registering view</p>
                    <p className="text-dusty-grape-100 font-semibold text-sm leading-tight">{movie.title}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="watched_date" className="text-dusty-grape-300 text-xs font-medium">Watch date</label>
                <input
                    type="date"
                    name="watched_date"
                    id="watched_date"
                    defaultValue={getCurrentDate()}
                    className="w-full p-2.5 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer"
                />
            </div>

            <button
                type="button"
                onClick={() => setShowDetails(d => !d)}
                className="text-dusty-grape-400 hover:text-dusty-grape-200 text-xs font-medium text-left transition-colors"
            >
                {showDetails ? '− Hide details' : '+ Add details'}
            </button>

            {showDetails && (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-dusty-grape-300 text-xs font-medium">
                            Rating <span className="text-dusty-grape-500">(optional)</span>
                        </label>
                        <div className="flex gap-1 flex-wrap">
                            {[...Array(10)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    type="button"
                                    onClick={() => setRating(r => r === String(i + 1) ? '' : String(i + 1))}
                                    className={`w-8 h-8 rounded-full text-xs font-bold transition-colors
                                        ${rating === String(i + 1)
                                            ? 'bg-dusty-grape-500 text-white shadow-md'
                                            : 'bg-dusty-grape-700 text-dusty-grape-200 hover:bg-dusty-grape-600'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="language" className="text-dusty-grape-300 text-xs font-medium">Language</label>
                            <select name="language" id="language" defaultValue={movie.original_language ?? ''} className="w-full p-2.5 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer">
                                <option value="">—</option>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="pt">Portuguese</option>
                                <option value="ru">Russian</option>
                                <option value="ja">Japanese</option>
                                <option value="zh">Chinese</option>
                                <option value="ko">Korean</option>
                                <option value="ar">Arabic</option>
                                <option value="hi">Hindi</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="place" className="text-dusty-grape-300 text-xs font-medium">Where</label>
                            <select name="place" id="place" defaultValue={""} className="w-full p-2.5 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer">
                                <option value="">—</option>
                                <option value="home">Home</option>
                                <option value="cinema">Cinema</option>
                                <option value="friend">Friends'</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="comment" className="text-dusty-grape-300 text-xs font-medium">
                            Comment <span className="text-dusty-grape-500">(optional)</span>
                        </label>
                        <textarea
                            name="comment"
                            id="comment"
                            rows="2"
                            placeholder="What did you think?"
                            className="resize-none w-full p-2.5 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors"
                        />
                    </div>
                </div>
            )}

            <div className='flex gap-3 mt-1'>
                <button
                    type="submit"
                    className='flex-1 bg-dusty-grape-600 text-white px-4 py-2 rounded hover:bg-dusty-grape-500 transition-colors font-semibold shadow-md text-sm'
                >
                    Save
                </button>
                <button
                    type="button"
                    className='flex-1 bg-dusty-grape-700 text-dusty-grape-100 px-4 py-2 rounded hover:bg-dusty-grape-600 transition-colors font-semibold shadow-md border border-dusty-grape-600 text-sm'
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
