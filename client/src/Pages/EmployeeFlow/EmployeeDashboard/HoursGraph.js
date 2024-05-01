import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useMobileDetection } from '../../../hooks/useMobile'

const HoursGraph = ({ monthlyHours }) => {
    const isMobile = useMobileDetection()
    const data = [
        { month: 'January', hours: monthlyHours[0] },
        { month: 'February', hours: monthlyHours[1] },
        { month: 'March', hours: monthlyHours[2] },
        { month: 'April', hours: monthlyHours[3] },
        { month: 'May', hours: monthlyHours[4] },
        { month: 'June', hours: monthlyHours[5] },
        { month: 'July', hours: monthlyHours[6] },
        { month: 'August', hours: monthlyHours[7] },
        { month: 'Spetember', hours: monthlyHours[8] },
        { month: 'October', hours: monthlyHours[9] },
        { month: 'November', hours: monthlyHours[10] },
        { month: 'December', hours: monthlyHours[11] }
    ]

    const d = new Date()
    const currentMonth = d.getMonth() + 1

    const avgHours = (
        monthlyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / currentMonth
    ).toFixed(1)

    return (
        <div className="border border-gray-400 rounded-xl md:mt-0 mt-2">
            <div className="md:px-10 px-5 py-2 mb-5">
                <h2 className="md:text-xl text-lg font-semibold">Monthly Hours Worked</h2>
                <p className="text-xl font-medium">{avgHours}</p>
            </div>
            <BarChart width={isMobile ? 200 : 300} height={isMobile ? 150 : 250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#1b204a" name="Hours Worked" />
            </BarChart>
        </div>
    )
}

export default HoursGraph
