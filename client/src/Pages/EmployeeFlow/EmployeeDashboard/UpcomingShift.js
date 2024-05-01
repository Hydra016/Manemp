import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DAYS } from '../../../lib/constants/days';

const UpcomingShift = ({ shift }) => {
    const [shopName, setShopName] = useState('')
    const startDate = new Date(shift && shift.start)
    const day = startDate.getDay()

    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    const formattedDate = startDate.toLocaleDateString('en-US', options)

    const formatTime = (time) => {
        const d = new Date(time)

        const hours = d.getHours()
        const minutes = d.getMinutes()

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12
        const ampm = hours < 12 ? 'AM' : 'PM'

        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`

        return formattedTime
    }

    const getShopName = async (data) => {
        const response = await axios.post('http://localhost:5000/api/searchShop', data)
        setShopName(response.data?.data.shopName)
    }

    useEffect(() => {
        getShopName({ shopId: shift.shopId })
    }, [])

    return (
        <div className="upcoming-shift">
            <p>{shopName && shopName}</p>
            <p>{shift && formattedDate}</p>
            <p>
                {shift && DAYS[day]} - {shift && `${formatTime(shift.start)} - ${formatTime(shift.end)}`}
            </p>
        </div>
    )
}

export default UpcomingShift
