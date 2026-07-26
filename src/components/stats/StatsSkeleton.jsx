const SkeletonBlock = ({ h = 'h-32', w = 'w-full' }) => (
    <div className={`${h} ${w} bg-dusty-grape-800 rounded-xl animate-pulse`} />
)

export const StatsSkeleton = () => (
    <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} h='h-28' />)}
        </div>
        <SkeletonBlock h='h-24' />
        <SkeletonBlock h='h-64' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <SkeletonBlock h='h-64' />
            <SkeletonBlock h='h-64' />
        </div>
        <SkeletonBlock h='h-64' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <SkeletonBlock h='h-64' />
            <SkeletonBlock h='h-64' />
        </div>
        <SkeletonBlock h='h-64' />
    </div>
)
