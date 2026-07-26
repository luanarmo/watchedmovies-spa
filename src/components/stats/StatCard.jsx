export const StatCard = ({ title, value, subtitle, icon }) => (
    <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
            <span className='text-dusty-grape-300 text-sm font-medium uppercase tracking-wider'>{title}</span>
            {icon && <span className='text-dusty-grape-400 text-xl'>{icon}</span>}
        </div>
        <p className='text-dusty-grape-50 text-3xl font-bold'>{value ?? '—'}</p>
        {subtitle && <p className='text-dusty-grape-400 text-sm'>{subtitle}</p>}
    </div>
)
