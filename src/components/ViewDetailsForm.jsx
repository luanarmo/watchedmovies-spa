
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2">
            <input type="number" min={1} max={10} step={1} name="rating" id="rating" placeholder="Califica la pelicula" className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none" />
            <textarea name="comment" id="comment" cols="25" rows="4" placeholder="Agrega un comentario" className="resize-none w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none"></textarea>
            <select name="language" id="language" defaultValue={"en"} className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
                <option value="en">Ingles</option>
                <option value="es">Español</option>
                <option value="fr">Francia</option>
                <option value="de">Alemania</option>
                <option value="it">Italia</option>
                <option value="pt">Portuges</option>
                <option value="ru">Ruso</option>
                <option value="ja">Japones</option>
                <option value="zh">Chino</option>
                <option value="ko">Corea</option>
                <option value="ar">Árabe</option>
                <option value="hi">Hindi</option>
                <option value="other">Otro</option>
            </select>
            <select name="place" id="place" defaultValue={"cinema"} className="w-full p-2 border  text-black border-gray-500 rounded focus:border-blue-500 focus:outline-none text-sm">
                <option value="home">Casa</option>
                <option value="cinema">Cine</option>
                <option value="friend">Casa de amigos</option>
                <option value="other">Otro</option>
            </select>
            <div className='flex gap-4 mt-4'>
                <button
                    type="submit"
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                >
                    Guardar
                </button>
                <button
                    type="submit"
                    className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>

        </form>
    )
}
