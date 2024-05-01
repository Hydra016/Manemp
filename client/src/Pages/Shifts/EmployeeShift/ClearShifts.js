import React from 'react'
import './styles.css'

const ClearShifts = ({data, disabled, setShifts}) => {

  const handleClick = () => {
    sessionStorage.removeItem('shifts');
    setShifts([])
  }

  return (
    <button disabled={disabled} onClick={handleClick} className='clear-btn save-btn'>Clear</button>
  )
}

export default ClearShifts