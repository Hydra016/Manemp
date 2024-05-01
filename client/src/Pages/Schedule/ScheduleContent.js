import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ScheduleContent = ({ arg }) => {
    const [employee, setEmployee] = useState({})

    const getCurrentEmployee = async (data) => {
        if (data) {
            const response = await axios.post('http://localhost:5000/api/employee', data)
            setEmployee(response.data.employee[0])
        }
    }

    useEffect(() => {
        if (arg.event._def.extendedProps.employeeId) {
            getCurrentEmployee({ empId: arg.event._def.extendedProps.employeeId })
        }
    }, [arg.event._def.extendedProps.employeeId])

    return (
        <div>
            <p>{arg.timeText}</p>
            {arg && (
                <div>
                    <p>{employee && employee.givenName}</p>
                    <p>{arg.event._def.extendedProps.hours} hours</p>
                </div>
            )}
        </div>
    )
}

export default ScheduleContent
