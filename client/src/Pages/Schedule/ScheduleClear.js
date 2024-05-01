import React, { useEffect } from 'react'
import './styles.css'
import { saveShifts } from '../../features/shiftSlice'
import { useDispatch, useSelector } from 'react-redux'

const ScheduleClear = ({data, disabled, setShifts, currentSelectedShop}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(saveShifts({ shiftData: data, shopId: currentSelectedShop }));
    sessionStorage.removeItem('shifts');
    dispatch(setShifts([]))
  }

  return (
    <button disabled={disabled} onClick={handleClick} className='schedule-save-btn'>Clear</button>
  )
}

export default ScheduleClear