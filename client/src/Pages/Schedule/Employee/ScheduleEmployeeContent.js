import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ScheduleEmployeeContent = ({ arg }) => {
    const [shop, setShop] = useState({})

    const getShopDetails = async (data) => {
        if (data) {
            const response = await axios.post('http://localhost:5000/api/searchShop', data)
            setShop(response.data.data)
        }
    }

    useEffect(() => {
        if (arg.event._def.extendedProps.shopId) {
            getShopDetails({ shopId: arg.event._def.extendedProps.shopId })
        }
    }, [arg.event._def.extendedProps.shopId])

    return (
        <div>
            <p>{arg.timeText}</p>
            <p>{shop && shop.shopName}</p>
            {arg && (
                <div>
                    <p>{arg.event._def.extendedProps.hours} hours</p>
                </div>
            )}
        </div>
    )
}

export default ScheduleEmployeeContent
