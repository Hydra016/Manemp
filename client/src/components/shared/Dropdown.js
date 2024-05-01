import React from 'react'
import { HiChevronRight, HiUserCircle, HiQuestionMarkCircle, HiCog, HiOutlineLogout } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { openModal } from '../../features/commonSlice'
import { useDispatch, useSelector } from 'react-redux'

const Dropdown = ({ user, dropDown }) => {
    const dispatch = useDispatch()
    const { modalOpened } = useSelector((state) => state.common)

    return (
        <div className={`dropdown ${dropDown ? 'animate-slide-down' : 'animate-slide-up'}`}>
            <div className="dropdown-img-container">
                <img src={user.picture} />
                <div className="dropdown-header">
                    <span className="dropdown-header-heading">
                        {user.role === 'business' ? user.shopName : user.givenName}
                    </span>
                    <span className="dropdown-header-text">{user.googleId}</span>
                </div>
            </div>
            <div className="seperator"></div>
            <div className="dropdown-body">
                <Link className="dropdown-link extra-margin">
                    <div className="dropdown-link-text-container">
                        <HiUserCircle className="icon" />
                        <span>Profile</span>
                    </div>
                    <HiChevronRight />
                </Link>
                <Link className="dropdown-link extra-margin">
                    <div className="dropdown-link-text-container">
                        <HiCog className="icon" />
                        <span>Settings</span>
                    </div>
                    <HiChevronRight />
                </Link>
                <Link className="dropdown-link extra-margin">
                    <div className="dropdown-link-text-container">
                        <HiQuestionMarkCircle className="icon" />
                        <span>Help and support</span>
                    </div>
                    <HiChevronRight />
                </Link>
                <Link onClick={() => dispatch(openModal(true))} className="dropdown-link">
                    <div className="dropdown-link-text-container">
                        <HiOutlineLogout className="icon" />
                        <span>Logout</span>
                    </div>
                    <HiChevronRight />
                </Link>
            </div>
        </div>
    )
}

export default Dropdown
