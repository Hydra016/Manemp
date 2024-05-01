import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useDispatch, useSelector } from 'react-redux'
import { getSchedule } from '../../../features/scheduleSlice'
import ScheduleEmployeeContent from './ScheduleEmployeeContent'

const EmployeeSchedule = () => {
    const { user } = useSelector(state => state.user);
    const { schedule, isLoading } = useSelector(state => state.schedule);
    const dispatch = useDispatch();
    
    useEffect(() => {
        user && dispatch(getSchedule({ empId: user.googleId }))
    }, [])

    const eventContent = (arg) => {
        return <ScheduleEmployeeContent arg={arg} />
    }

  return (
    <div>
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
                selectable={false}
                selectMirror={false}
                events={!isLoading && schedule}
                eventContent={eventContent}
                initialEvents={schedule && schedule}
            />
    </div>
  )
}

export default EmployeeSchedule