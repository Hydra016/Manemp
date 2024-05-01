import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequests } from '../../features/requestsSlice'
import SingleRequest from './SingleRequest'
import { CiFileOff } from 'react-icons/ci'
import LoadingScreen from '../../components/shared/LoadingScreen'
import { useSocket } from '../../hooks/useSocket'

const Requests = () => {
    const { requests, isLoading, employeeRequests } = useSelector((state) => state.request)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const socket = useSocket();

    useEffect(() => {
        dispatch(fetchRequests({ userId: user.googleId }))
    }, [])

    socket.on("updatedSearchShop", (data) => {
        console.log(data)
    })

    return (
        <div className='requests-container'>
            <span className="sub-heading">{requests && requests.length} Active Requests</span>
            {isLoading ? <LoadingScreen /> : requests.length >= 1 ? <table className="request-table">
                <thead>
                    <tr>
                        <td className="table-cell">{user.role === 'business' ? 'Employee' : 'Business'}</td>
                        {user.role === 'employee' && <td className="table-cell">Business type</td>}
                        <td className="table-cell">Request Date</td>
                        <td className="table-cell">Status</td>
                        {user.role === 'business' && <td className="table-cell">Accept Offer</td>}
                        <td className="table-cell">{user.role === 'employee' ? 'Request Action' : 'Reject Offer'}</td>
                    </tr>
                </thead>
                {requests && requests.length > 0 && <tbody>
                    {requests && requests.map(requestData => <SingleRequest key={requestData._id} requestData={requestData} />)}
                </tbody> }
            </table>
            : <div className='no-request'>
                <div className='no-request-container'><CiFileOff className='no-request-icon'/>
                <span>No requests to show</span></div>
                </div>}
        </div>
    )
}

export default Requests
