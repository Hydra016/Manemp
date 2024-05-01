import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, openSearchModal } from '../../features/commonSlice'
import { logoutUser } from '../../features/userSlice'
import { CiShop } from 'react-icons/ci'
import { sendRequest } from '../../features/requestsSlice'
import { io } from 'socket.io-client';
import { useSocket } from '../../hooks/useSocket'

const SearchModal = ({ isOpen }) => {
    const { searchedShop } = useSelector((state) => state.shop)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const socket = useSocket()

    // useEffect(() => {
    //     socket.emit("searchedShop", 123)
    // }, [searchedShop])

    if (!isOpen) {
        return null
    }

    const handleSendRequest = () => {
            socket.emit("searchedShop", "changed")
            dispatch(sendRequest({ businessId: searchedShop.googleId, employeeId: user.googleId }))
            dispatch(openSearchModal(false))
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div>
                        <CiShop />
                    </div>
                    <h2>{searchedShop && searchedShop.shopName}</h2>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to send employement request to {searchedShop.shopName}?</p>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={handleSendRequest}
                    >
                        Yes
                    </button>
                    <button onClick={() => dispatch(openSearchModal(false))}>No</button>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
