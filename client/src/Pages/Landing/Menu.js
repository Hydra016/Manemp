import React from 'react'
import { Link } from 'react-router-dom'
import { HiQuestionMarkCircle, HiUser, HiBriefcase, HiUserGroup } from 'react-icons/hi'

const Menu = ({ menuOpened }) => {
    return (
        <div className={menuOpened ? 'show menu' : 'menu'}>
            <div className="landing-menu">
                <Link className="menu-item">
                    <HiUserGroup />
                    <span>About Us</span>
                </Link>
                <Link className="menu-item">
                    <HiQuestionMarkCircle />
                    <span>How it works?</span>
                </Link>
                <Link to="http://localhost:5000/auth/google" className="menu-item">
                    <HiBriefcase />
                    <span>Business Login</span>
                </Link>
                <Link className="menu-item" to={'http://localhost:5000/auth/google/employee'}>
                    <HiUser />
                    <span>Employee Login</span>
                </Link>
            </div>
            <div>
                <span className="version">V1.0</span>
            </div>
        </div>
    )
}

export default Menu
