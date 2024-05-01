import React, { useCallback, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useDispatch, useSelector } from 'react-redux'
import { openShiftModal, setCurrentScheduleEmployee } from '../../features/commonSlice'
import { storeTemporaryShifts } from '../../features/shiftSlice'
import SaveModal from '../../components/Modals/SaveModal'
import { getEmployeesByBusiness } from '../../features/userSlice'
import './styles.css'
import ScheduleSave from './ScheduleSave'
import axios from 'axios'
import ScheduleClear from './ScheduleClear'
import { getSchedule } from '../../features/scheduleSlice'
import ScheduleContent from './ScheduleContent'
import ScheduleDelete from './ScheduleDelete'

const AddShift = () => {
    const { isLoading, temporaryShifts } = useSelector((state) => state.shifts)
    const { user, employees } = useSelector((state) => state.user)
    const { currentScheduleEmployee } = useSelector((state) => state.common)
    const { isLoading : scheduleLoading, schedule  } = useSelector(state => state.schedule);
    const dispatch = useDispatch()
    const [events, setEvents] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [deletableShifts, setDeletableShifts] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState(null)

    useEffect(() => {
        user && dispatch(getEmployeesByBusiness({ shopId: user.googleId }))
        dispatch(getSchedule({ shopId: user.googleId }))
        sessionStorage.getItem('shifts') && dispatch(storeTemporaryShifts(JSON.parse(sessionStorage.getItem('shifts'))))
    }, [])

    useEffect(() => {
        employees && employees.length > 0 && setCurrentEmployee(employees[0].googleId)
    }, [employees])

    useEffect(() => {
        dispatch(setCurrentScheduleEmployee(currentEmployee))
    }, [currentEmployee])

    const handleSelect = (info) => {
        const start = info.start
        const end = info.end

        const hours = Math.abs((end - start) / (60 * 60 * 1000))

        const day = start.getDay()

        const selectedShiftData = {
            start,
            end,
            hours,
            day,
            employeeId: currentScheduleEmployee && currentScheduleEmployee,
            shopId: user.googleId,
            amount: user.salary * hours
        }

        sessionStorage.setItem('shifts', JSON.stringify([...temporaryShifts, selectedShiftData]))
        dispatch(storeTemporaryShifts(JSON.parse(sessionStorage.getItem('shifts'))))
        dispatch(openShiftModal(true))
    }



    const eventContent = (arg) => {
        return <ScheduleContent arg={arg} />
    }

    useEffect(() => {
        temporaryShifts && temporaryShifts.length > 0 && setDisabled(false)
        const finalEvents = temporaryShifts && temporaryShifts.concat(schedule)
        setEvents(finalEvents)
    }, [temporaryShifts, schedule])

    const handleEventClick = (info) => {
        const clickedShift = info.event
        const eventElement = info.el

        info.jsEvent.preventDefault()
        const shiftId = clickedShift._def.extendedProps._id
        const isShiftSelected = deletableShifts.includes(shiftId)

        eventElement.classList.toggle('red-event')

        console.log(clickedShift._def.extendedProps)

        if (isShiftSelected) {
            setDeletableShifts(deletableShifts.filter((id) => id !== shiftId))
        } else {
            setDeletableShifts([...deletableShifts, shiftId])
        }
    }

    return (
        <div className="scheduler-container">
            <div className="top-btn-container">
                <div className="schedule-dropdown-container">
                    <label>Employee</label>
                    <select
                        onChange={(e) => setCurrentEmployee(e.target.value)}
                        className="schedule-dropdown bg-neutral-700 text-white flex items-center font-light hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 text-base"
                    >
                        {employees &&
                            employees.map((employee) => {
                                return (
                                    <option key={employee._id} value={employee.googleId}>
                                        {employee.givenName}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <ScheduleSave currentSelectedShop={user.googleId} data={temporaryShifts} setShifts={storeTemporaryShifts} />
                <ScheduleClear setShifts={storeTemporaryShifts}/>
                <ScheduleDelete data={deletableShifts} user={user.googleId} disabled={disabled} setDeletableShifts={setDeletableShifts} />
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev next',
                    center: 'title',
                    right: 'timeGridWeek'
                }}
                nowIndicator={true}
                editable={false}
                droppable={false}
                selectable={true}
                selectMirror={true}
                select={handleSelect}
                events={!isLoading && events}
                eventContent={eventContent}
                initialEvents={events && events}
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default AddShift
