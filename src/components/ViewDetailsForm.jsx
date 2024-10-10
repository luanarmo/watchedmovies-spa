
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


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-2">
            <div className="flex flex-col w-full">
                {/* <input type="number" min={1} max={10} step={1} name="rating" id="rating" placeholder="Rate the movie" className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none" /> */}
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
            <select name="language" id="language" defaultValue={"en"} className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
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
            <select name="place" id="place" defaultValue={"cinema"} className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
                <option value="home">Home</option>
                <option value="cinema">Cinema</option>
                <option value="friend">Friends' house</option>
                <option value="other">Other</option>
            </select>
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
