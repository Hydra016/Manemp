import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useDispatch, useSelector } from 'react-redux'
import { getShifts, getEmployeeShifts } from '../../../features/shiftSlice'
import EventContent from './EventContent'
import './styles.css'

const BusinessShift = () => {
    const { shifts } = useSelector((state) => state.shifts)
    const { employees, user } = useSelector((state) => state.user)
    const [employee, setCurrentEmployee] = useState('all')
    const dispatch = useDispatch()

    useEffect(() => {
        employee == 'all'
            ? dispatch(getShifts({ shopId: user.googleId }))
            : dispatch(getEmployeeShifts({ employeeId: employee, shopId: user.googleId }))
    }, [employee])

    const eventContent = (arg) => {
        return (
            <>
                <p>{arg.timeText}</p>
                <EventContent arg={arg.event._def.extendedProps} />
            </>
        )
    }

    return (
        <div className="businessShiftContainer">
            <div className="employeeSelectContainer">
                <select onChange={(e) => setCurrentEmployee(e.target.value)}>
                    <option value="all">All</option>
                    {employees.length > 0 &&
                        employees.map((emp) => {
                            return (
                                <option key={emp.googleId} value={emp.googleId}>
                                    {emp.givenName}
                                </option>
                            )
                        })}
                </select>
            </div>
            <FullCalendar
                plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
                headerToolbar={{
                    left: 'prev next',
                    center: 'title',
                    right: 'timeGridWeek'
                }}
                nowIndicator={true}
                selectMirror={true}
                events={shifts}
                eventContent={eventContent}
            />
        </div>
    )
}

export default BusinessShift
