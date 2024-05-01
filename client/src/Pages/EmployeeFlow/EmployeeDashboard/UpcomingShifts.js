import React, { useEffect } from 'react'
import { LuExternalLink } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { getUpcomingShifts } from '../../../features/scheduleSlice'
import UpcomingShift from './UpcomingShift'
import { Link } from 'react-router-dom'
 
const UpcomingShifts = () => {
    const { upcomingShifts } = useSelector((state) => state.schedule)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUpcomingShifts({ empId: user.googleId }))
    }, [])

    return (
        <div className="upcoming-shifts-container md:mt-0">
            <h1 className="box-heading">Upcoming shifts</h1>
            <div className="upcoming-shifts">
                {upcomingShifts.length > 0 ? upcomingShifts.map(shift => {
                    return <UpcomingShift shift={shift} />
                }) : <div className='no-upcoming-shifts'>No upcoming shifts</div>}
            </div>
            <Link to={'/schedule'} className="box-btn shifts-btn">
                View schedule <LuExternalLink className="box-link" />
            </Link>
        </div>
    )
}

export default UpcomingShifts
