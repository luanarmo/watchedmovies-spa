export const Pagination = ({ page, handlePage }) => {
    return (
        <div className="flex items-center justify-center rounded-full bg-gray-200 p-1">
            <button
                className={'px-4 py-2 rounded-full transition-colors text-gray-700 hover:bg-gray-300'}
                onClick={() => {
                    const newPage = page - 1
                    if (newPage < 1) return
                    handlePage(newPage)
                }}
            >
                Before
            </button>
            <p className='text-xl p-2'>
                {page}
            </p>
            <button
                className={'x-4 py-2 rounded-full transition-colors text-gray-700 hover:bg-gray-300'}
                onClick={() => {
                    const newPage = page + 1
                    handlePage(newPage)
                }}
            >
                Next
            </button>
        </div>
    );
}