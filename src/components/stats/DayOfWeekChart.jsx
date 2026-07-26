import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const GRAPE = '#3d3168'
const HIGHLIGHT = '#6552ad'
const GRID = '#292145'
const TICK = '#a397ce'

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className='bg-dusty-grape-900 border border-dusty-grape-700 rounded-lg px-3 py-2 text-sm'>
            <p className='text-dusty-grape-300 font-semibold'>{label}</p>
            <p className='text-dusty-grape-50'>{payload[0].value} movies</p>
        </div>
    )
}

export const DayOfWeekChart = ({ data }) => {
    const maxCount = Math.max(...(data || []).map((d) => d.count), 0)

    return (
        <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-4'>
            <h3 className='text-dusty-grape-100 font-semibold'>Busiest Day of the Week</h3>
            <ResponsiveContainer width='100%' height={220}>
                <BarChart data={data || []} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray='3 3' stroke={GRID} />
                    <XAxis dataKey='day' tick={{ fill: TICK, fontSize: 11 }} />
                    <YAxis tick={{ fill: TICK, fontSize: 12 }} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3d316820' }} />
                    <Bar dataKey='count' radius={[4, 4, 0, 0]}>
                        {(data || []).map((entry, i) => (
                            <Cell key={i} fill={entry.count === maxCount && maxCount > 0 ? HIGHLIGHT : GRAPE} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
