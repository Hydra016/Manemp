import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import SaveModal from '../../../components/Modals/SaveModal'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeShifts } from '../../../features/shiftSlice'
import ClearShifts from './ClearShifts'
import DeleteShift from './DeleteShift'

const AddShift = () => {
    const { shifts: myShifts, isLoading } = useSelector((state) => state.shifts)
    const { currentSelectedShop } = useSelector((state) => state.common)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [shifts, setShifts] = useState([])
    const [events, setEvents] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [deletableShifts, setDeletableShifts] = useState([])

    useEffect(() => {
        dispatch(getEmployeeShifts({ employeeId: user.googleId, shopId: currentSelectedShop }))
        sessionStorage.getItem('shifts') && setShifts(JSON.parse(sessionStorage.getItem('shifts')))
    }, [currentSelectedShop])

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
            employeeId: user.googleId,
            shopId: currentSelectedShop,
            amount: user.salary * hours
        }

        setShifts((prevShifts) => [...prevShifts, selectedShiftData])
        sessionStorage.setItem('shifts', JSON.stringify([...shifts, selectedShiftData]))
    }

    const eventContent = (arg) => {
        // const currentShop = user.shops.find(shop => shop.shopId === currentSelectedShop);
        return (
            <div>
                <p>{arg.timeText}</p>
                {arg && (
                    <div>
                        <p>{arg.event._def.extendedProps.hours} hours</p>
                        <p>{arg.event._def.extendedProps.amount} €</p>
                        {/* <p>{currentShop.shopName}</p> */}
                    </div>
                )}
            </div>
        )
    }

    useEffect(() => {
        shifts && shifts.length > 0 && setDisabled(false)
        const finalEvents = shifts && shifts.concat(myShifts)
        setEvents(finalEvents)
    }, [myShifts, shifts])

    const handleEventClick = (info) => {
        const clickedShift = info.event
        const eventElement = info.el

        currentSelectedShop !== 'all' && eventElement.classList.toggle('red-event')

        info.jsEvent.preventDefault()
        const shiftId = clickedShift._def.extendedProps._id
        const isShiftSelected = deletableShifts.includes(shiftId)

        if (isShiftSelected) {
            setDeletableShifts(deletableShifts.filter((id) => id !== shiftId))
        } else {
            setDeletableShifts([...deletableShifts, shiftId])
        }
    }

    return (
        <div className="scheduler-container">
            <div>
                <SaveModal currentSelectedShop={currentSelectedShop} disabled={disabled} data={shifts} setShifts={setShifts} />
                <ClearShifts disabled={disabled} data={shifts} setShifts={setShifts} />
                <DeleteShift disabled={disabled} data={deletableShifts} setDeletableShifts={setDeletableShifts} currentSelectedShop={currentSelectedShop} />
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev next',
                    center: 'title',
                    right: 'timeGridWeek'
                }}
                nowIndicator={true}
                editable={currentSelectedShop !== 'all' && true}
                droppable={currentSelectedShop !== 'all' && true}
                selectable={currentSelectedShop !== 'all' && true}
                selectMirror={currentSelectedShop !== 'all' && true}
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
