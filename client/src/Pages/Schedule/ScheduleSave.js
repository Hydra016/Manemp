import React, { useEffect } from 'react'
import './styles.css'
import { saveSchedule } from '../../features/scheduleSlice'
import { useDispatch, useSelector } from 'react-redux'

const ScheduleSave = ({ data, disabled, setShifts, currentSelectedShop }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(saveSchedule({ shiftData: data, shopId: currentSelectedShop }))
        sessionStorage.removeItem('shifts')
        dispatch(setShifts([]))
    }

    return (
        <button disabled={disabled} onClick={handleClick} className="schedule-save-btn">
            Save
        </button>
    )
}

export default ScheduleSave
