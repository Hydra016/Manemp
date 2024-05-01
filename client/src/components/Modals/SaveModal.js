import React, { useEffect } from 'react'
import './styles.css'
import { saveShifts } from '../../features/shiftSlice'
import { useDispatch, useSelector } from 'react-redux'

const SaveModal = ({data, disabled, setShifts, currentSelectedShop}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(saveShifts({ shiftData: data, shopId: currentSelectedShop }));
    sessionStorage.removeItem('shifts');
    setShifts([])
  }

  return (
    <button disabled={disabled} onClick={handleClick} className='save-btn'>Save</button>
  )
}

export default SaveModal