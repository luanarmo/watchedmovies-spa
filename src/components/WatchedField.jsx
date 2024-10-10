
export function WatchedField({ field, icon }) {
    return (
        <div className='flex items-center gap-2'>
            {icon}
            <p>{field}</p>
        </div>
    )
}
