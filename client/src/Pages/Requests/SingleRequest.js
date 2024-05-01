import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './styles.css'
import { HiTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { CiShop } from 'react-icons/ci'
import { acceptRequest, deleteRequest } from '../../features/requestsSlice'

const SingleRequest = ({ requestData }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const [userRequest, setUserRequest] = useState({})

    const fetchRequestData = async (data) => {
        const response = await axios.post('http://localhost:5000/api/getRequestData', data)
        setUserRequest(response.data.data)
    }

    useEffect(() => {
        fetchRequestData(
            user.role === 'business' ? { employeeId: requestData.employeeId } : { businessId: requestData.businessId }
        )
    }, [requestData])

    const handleSendRequest = (request) => {
        // socket.emit("request-id", request._id)

        dispatch(
            acceptRequest({
                requestId: request._id,
                userId: user.googleId,
                employeeId: request.employeeId,
                shopName: user.shopName
            })
        )
    }

    return (
        <tr className="singleRequest">
            {userRequest && (
                <>
                    <td className="table-cell">
                        <div className="retract-link user-info">
                            <img src={userRequest.picture} className="request-img" />
                            <div className="singleRequest-shopType">
                                <CiShop />
                                <span>{userRequest.shopName ? userRequest.shopName : userRequest.givenName}</span>
                            </div>
                        </div>
                    </td>

                    {user.role === 'employee' && <td className="table-cell">{userRequest.shopType}</td>}
                    <td className="table-cell">{requestData && requestData.createdAt.slice(0, 10)}</td>
                    <td className="table-cell">
                        <div className="retract-link">
                            <div
                                className={`status ${Object.keys(requestData.status).find(
                                    (key) => requestData.status[key] === 1
                                )}`}
                            >
                                {(requestData &&
                                    Object.keys(requestData.status).find((key) => requestData.status[key] === 1)) ||
                                    ''}
                            </div>
                        </div>
                    </td>
                    {user.role === 'business' && (
                        <td className="table-cell">
                            {user.role === 'business' && requestData.status.pending === 1 ? (
                                <button
                                    onClick={() => handleSendRequest(requestData)}
                                    className="retract-link accept-offer"
                                >
                                    <div>
                                        <span>Accept Offer</span>
                                    </div>
                                </button>
                            ) : (
                                <button className="retract-link accepted-btn" disabled>
                                    <div>
                                        <span>Accepted</span>
                                    </div>
                                </button>
                            )}
                        </td>
                    )}
                    <td className="table-cell">
                        <button
                            onClick={() =>
                                dispatch(deleteRequest({ requestId: requestData._id, userId: user.googleId }))
                            }
                            className="retract-link retract-link-color"
                        >
                            <div>
                                <span>Retract Offer</span>
                                <HiTrash />
                            </div>
                        </button>
                    </td>
                </>
            )}
        </tr>
    )
}

export default SingleRequest

// ${}
