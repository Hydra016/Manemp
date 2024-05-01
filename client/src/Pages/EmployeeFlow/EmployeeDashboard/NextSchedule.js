import React, { useEffect, useState } from 'react'
import ScheduleTimingSwitch from './ScheduleTimingSwitch'
import { DAYS } from '../../../lib/constants/days'

const NextSchedule = () => {
    const [timing, setTiming] = useState([
        {
            day: 'Sunday',
            morning: true
        },
        {
            day: 'Monday',
            morning: true
        },
        {
            day: 'Tuesday',
            morning: true
        },
        {
            day: 'Wednesday',
            morning: true
        },
        {
            day: 'Thursday',
            morning: true
        },
        {
            day: 'Friday',
            morning: true
        },
        {
            day: 'Saturday',
            morning: true
        }
    ])

    const handleSave = () => {
        sessionStorage.setItem('schedule', JSON.stringify(timing))
    }

    return (
        <div className="next-schedule-container">
            <h1 className="box-heading">Next Week Schedule</h1>
            <div className="next-schedule-timing-container">
                {timing.map((day) => {
                    return (
                        <div className="next-schedule-timing" key={timing.day}>
                            <p>{day.day}</p>
                            <ScheduleTimingSwitch setTiming={setTiming} morning={day.morning} day={day.day} />
                        </div>
                    )
                })}
            </div>
            <button className="schedule-save" onClick={handleSave}>
                save
            </button>
        </div>
    )
}

export default NextSchedule
