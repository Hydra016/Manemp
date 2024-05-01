import React, { useState } from 'react'
import { FcBullish } from 'react-icons/fc'
import { HiUser, HiBriefcase } from 'react-icons/hi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const AuthNav = () => {
    return (
        <div className="navbar">
            <div className="flex items-center gap-2 px-1 py-3">
                <Link to={'/'} className='logo-link'>
                <FcBullish fontSize={24} />
                <span className="nav-heading">Manemp</span>
                </Link>
            </div>
            <Link className='primary-btn'>
                Signup
            </Link>

        </div>
    )
}

export default AuthNav
