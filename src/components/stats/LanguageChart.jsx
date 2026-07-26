import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#6552ad', '#8474be', '#a397ce', '#3d3168', '#c2bade', '#51418b']

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
        <div className='bg-dusty-grape-900 border border-dusty-grape-700 rounded-lg px-3 py-2 text-sm'>
            <p className='text-dusty-grape-300 font-semibold'>{payload[0].name}</p>
            <p className='text-dusty-grape-50'>{payload[0].value} movies</p>
        </div>
    )
}

export const LanguageChart = ({ data }) => {
    if (!data?.length) {
        return (
            <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex items-center justify-center h-64'>
                <p className='text-dusty-grape-400 text-sm'>No language data</p>
            </div>
        )
    }

    return (
        <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-4'>
            <h3 className='text-dusty-grape-100 font-semibold'>Viewing Language</h3>
            <ResponsiveContainer width='100%' height={260}>
                <PieChart>
                    <Pie data={data} dataKey='count' nameKey='label' cx='50%' cy='45%' outerRadius={90} paddingAngle={2}>
                        {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType='circle' iconSize={8} formatter={(v) => <span style={{ color: '#a397ce', fontSize: 12 }}>{v}</span>} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
