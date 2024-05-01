import React from 'react'
import './styles.css'
import { deleteShifts } from '../../../features/shiftSlice';
import { useDispatch } from 'react-redux';

const DeleteShift = ({data, disabled, setDeletableShifts, currentSelectedShop}) => {
  const dispatch = useDispatch();

  console.log(currentSelectedShop)

  const handleClick = () => {
    dispatch(deleteShifts({
      shifts: data,
      shopId: currentSelectedShop
    }))
  }

  return (
    <button onClick={currentSelectedShop !== 'all' ? handleClick : null} className='clear-btn save-btn'>Delete</button>
  )
}

export default DeleteShift