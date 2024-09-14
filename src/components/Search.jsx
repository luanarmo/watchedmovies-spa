
export function Search() {
    return (
        <section className="w-full bg-gradient-to-r from-indigo-700 to-indigo-400 p-4 text-white">
            <h1 className="text-4xl font-bold mb-4 ">¡Bienvenido!</h1>
            <form className="container flex items-center justify-center space-x-4">
                <input
                    type="text"
                    placeholder="Busca una película ..."
                    className="flex-grow  sm:w-auto p-2 border text-black border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    className="flex-shrink-0 sm:w-auto bg-indigo-700 p-2 rounded-sm hover:bg-indigo-800"
                >
                    Buscar
                </button>
            </form>
        </section>
    )
}