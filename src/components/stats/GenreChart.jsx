import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const GRAPE = '#6552ad'
const GRID = '#292145'
const TICK = '#a397ce'

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
        <div className='bg-dusty-grape-900 border border-dusty-grape-700 rounded-lg px-3 py-2 text-sm'>
            <p className='text-dusty-grape-300 font-semibold'>{payload[0].payload.name}</p>
            <p className='text-dusty-grape-50'>{payload[0].value} movies</p>
        </div>
    )
}

export const GenreChart = ({ data }) => {
    const top = (data || []).slice(0, 10)

    return (
        <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-4'>
            <h3 className='text-dusty-grape-100 font-semibold'>Genres</h3>
            <ResponsiveContainer width='100%' height={280}>
                <BarChart data={top} layout='vertical' margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray='3 3' stroke={GRID} horizontal={false} />
                    <XAxis type='number' tick={{ fill: TICK, fontSize: 11 }} allowDecimals={false} />
                    <YAxis type='category' dataKey='name' tick={{ fill: TICK, fontSize: 11 }} width={90} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3d316820' }} />
                    <Bar dataKey='count' fill={GRAPE} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
