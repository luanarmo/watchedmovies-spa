export function MovieDetailsSkeleton() {
    return (
        <div className='flex flex-col p-4 gap-6 justify-start items-center w-full max-w-4xl mx-auto animate-pulse'>
            {/* Title */}
            <div className='bg-dusty-grape-700 w-3/4 h-10 rounded-md'></div>

            {/* Image */}
            <div className='bg-dusty-grape-800 w-full aspect-video rounded-xl shadow-lg border border-dusty-grape-700'></div>

            {/* Overview Section */}
            <section className='flex flex-col gap-4 items-center w-full md:w-3/4 bg-dusty-grape-800/50 p-6 rounded-xl border border-dusty-grape-700'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='bg-dusty-grape-700 w-full h-4 rounded'></div>
                    <div className='bg-dusty-grape-700 w-full h-4 rounded'></div>
                    <div className='bg-dusty-grape-700 w-3/4 h-4 rounded'></div>
                </div>

                {/* Buttons */}
                <div className='flex gap-4 w-full mt-4'>
                    <div className='bg-dusty-grape-700 h-12 w-full rounded-lg flex-1'></div>
                    <div className='bg-dusty-grape-700 h-12 w-full rounded-lg flex-1'></div>
                </div>
            </section>
        </div>
    )
}