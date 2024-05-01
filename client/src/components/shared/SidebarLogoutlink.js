import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { HiLogout } from 'react-icons/hi'
import { openModal } from '../../features/commonSlice'

const SidebarLogoutlink = () => {
    const dispatch = useDispatch()
    const { modalOpened } = useSelector(state => state.common)
    const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

    return (
        <Link onClick={() => dispatch(openModal(true))} className={classNames('text-red-500', linkClass)}>
            <span className="text-xl">
                <HiLogout />
            </span>
            Logout
        </Link>
    )
}

export default SidebarLogoutlink
