import React from 'react'
import './styles.css'
import { useDispatch } from 'react-redux';
import { deleteSchedule } from '../../features/scheduleSlice';

const ScheduleDelete = ({data, disabled, user, setDeletableShifts}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteSchedule({
      shifts: data,
      shopId: user
    }))
    setDeletableShifts([])
  }

  return (
    <button onClick={handleClick} className='schedule-save-btn'>Delete</button>
  )
}

export default ScheduleDelete