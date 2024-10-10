
export function Search({ onChange, onSubmit, search, error }) {

    return (
        <section className="w-full bg-gradient-to-r from-indigo-700 to-indigo-400 p-4 text-white">
            <form className="container flex items-center justify-center space-x-4" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Search a movie ..."
                    onChange={onChange}
                    value={search}
                    className="flex-grow  sm:w-auto p-2 border text-black border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    className="flex-shrink-0 sm:w-auto bg-indigo-700 p-2 rounded-sm hover:bg-indigo-800"
                >
                    Search
                </button>
            </form>
        </section>
    )
}