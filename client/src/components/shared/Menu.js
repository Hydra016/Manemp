import React, { useEffect } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { openMenu } from '../../features/commonSlice'
import { FcBullish } from 'react-icons/fc'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_EMPLOYEE_LINKS } from '../../lib/constants/navigation'
import SidebarLink from './SidebarLink'
import { HiLogout } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { logoutUser } from '../../features/userSlice'
import SidebarLogoutlink from './SidebarLogoutlink'

const Menu = () => {
    const { menuOpened } = useSelector((state) => state.common)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const linkClass =
        'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

    return (
        <>
            <div className={menuOpened ? 'show menu' : 'menu'}>
                <div className='menuButtonContainer'>
                <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className='menuHeaderText'>Manemp Business</span>
                </div>
                <button className='menuButton' onClick={() => dispatch(openMenu(false))}>
                    <HiMenuAlt1 className='menuIcon' />
                </button>
                </div>
                <div className="flex-1 py-8 flex flex-col gap-0.5">
                {user.role === 'business' ? DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                )) : DASHBOARD_SIDEBAR_EMPLOYEE_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <SidebarLogoutlink />
            </div>
            </div>
        </>
    )
}

export default Menu
