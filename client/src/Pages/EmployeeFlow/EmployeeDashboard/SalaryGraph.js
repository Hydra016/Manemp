import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useMobileDetection } from '../../../hooks/useMobile'

const SalaryGraph = ({ currentSalary, previousSalary }) => {
    const isMobile = useMobileDetection()
    const oldSalary = previousSalary
    const newSalary = currentSalary

    const percentageIncrease = ((newSalary - oldSalary) / oldSalary) * 100

    const data = [
        { month: 'Previous', salary: oldSalary },
        { month: 'Current', salary: newSalary }
    ]

    return (
        <div className="border border-gray-400 rounded-xl">
            <div className="md:px-8 px-5 mb-5 py-2">
                <h2 className="text-xl font-semibold">Salary</h2>
                <p className="text-xl font-medium">
                    {percentageIncrease.toFixed(1) > 0
                        ? `+${percentageIncrease.toFixed(1)}`
                        : percentageIncrease.toFixed(1)}
                    %
                </p>
            </div>
            <div>
                {' '}
                <LineChart width={isMobile ? 200 : 300} height={isMobile ? 150 : 250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="salary" stroke="#1b204a" name="Salary (Euros)" />
                </LineChart>
            </div>
        </div>
    )
}

export default SalaryGraph
