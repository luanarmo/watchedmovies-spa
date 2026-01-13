
export function ViewDetailsForm({ movie, onClose, onSubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        if (payload.rating === "") {
            delete payload.rating
        }

        onSubmit({ payload, movie })
        onClose()
    }

    const getCurrentDate = () => {
        const formatter = new Intl.DateTimeFormat('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })

        const parts = formatter.formatToParts(new Date())
        const formattedDate = `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
        return formattedDate
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-2">
            <div className="flex flex-col w-full">
                <select name="rating" id="rating" className="w-full p-3 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer">
                    <option value="">Rate the movie</option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <span className="text-dusty-grape-400 text-xs mt-1">Optional</span>
            </div>
            <div className="flex flex-col w-full">
                <textarea name="comment" id="comment" cols="25" rows="4" placeholder="Add a comment" className="resize-none w-full p-3 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none transition-colors"></textarea>
                <span className="text-dusty-grape-400 text-xs mt-1">Optional</span>
            </div>
            <select name="language" id="language" defaultValue={""} className="w-full p-3 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer">
                <option value="">Language</option>
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
            <select name="place" id="place" defaultValue={""} className="w-full p-3 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer">
                <option value="">Where did you watch it?</option>
                <option value="home">Home</option>
                <option value="cinema">Cinema</option>
                <option value="friend">Friends' house</option>
                <option value="other">Other</option>
            </select>
            <input
                type="date"
                name="watched_date"
                id="watched_date"
                defaultValue={getCurrentDate()}
                className="w-full p-3 border bg-dusty-grape-100 text-dusty-grape-900 border-dusty-grape-300 rounded focus:border-dusty-grape-500 focus:outline-none text-sm transition-colors cursor-pointer"
            />
            <div className='flex gap-4 mt-4 w-full'>
                <button
                    type="submit"
                    className='flex-1 bg-dusty-grape-600 text-white px-4 py-2 rounded hover:bg-dusty-grape-500 transition-colors font-semibold shadow-md'
                >
                    Save
                </button>
                <button
                    type="button"
                    className='flex-1 bg-dusty-grape-700 text-dusty-grape-100 px-4 py-2 rounded hover:bg-dusty-grape-600 transition-colors font-semibold shadow-md border border-dusty-grape-600'
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>

        </form>
    )
}
