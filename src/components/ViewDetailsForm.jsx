
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
                <select name="rating" id="rating" className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
                    <option value="">Rate the movie</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <span className="text-gray-500 text-xs">Optional</span>
            </div>
            <div className="flex flex-col w-full">
                <textarea name="comment" id="comment" cols="25" rows="4" placeholder="Add a comment" className="resize-none w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none"></textarea>
                <span className="text-gray-500 text-xs">Optional</span>
            </div>
            <select name="language" id="language" defaultValue={""} className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
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
            <select name="place" id="place" defaultValue={""} className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
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
                className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm"
            />
            <div className='flex gap-4 mt-4'>
                <button
                    type="submit"
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                >
                    Save
                </button>
                <button
                    type="submit"
                    className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>

        </form>
    )
}
