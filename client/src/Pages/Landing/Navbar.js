import React, { useState } from 'react'
import { FcBullish } from 'react-icons/fc'
import { HiUser, HiBriefcase } from 'react-icons/hi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Navbar = ({ setMenuOpened, menuOpened }) => {
    return (
        <div className="navbar">
            <div className="flex items-center gap-2 px-1 py-3">
                <Link to={'/'} className="logo-link">
                    <FcBullish fontSize={24} />
                    <span className="nav-heading">Manemp</span>
                </Link>
                <div className="nav-links">
                    <a className="nav-link" href="/">
                        About us
                    </a>
                    <a className="nav-link" href="/">
                        How it works?
                    </a>
                </div>
            </div>

            <div className="nav-btn-container">
                <HiMenuAlt1 onClick={() => setMenuOpened(!menuOpened)} className="nav-menu" />
                <Link to={'http://localhost:5000/auth/google/employee'} className="nav-btn">
                    <HiUser />
                    <span>Employee Login</span>
                </Link>
                <Link to="/login" state={{ loginType: 'business' }} className="nav-btn">
                    <HiBriefcase />
                    <span>Business Login</span>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
