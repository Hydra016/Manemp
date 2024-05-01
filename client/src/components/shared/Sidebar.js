import React, { useEffect, useState } from 'react'
import { FcBullish } from 'react-icons/fc'
import {
    DASHBOARD_SIDEBAR_BOTTOM_LINKS,
    DASHBOARD_SIDEBAR_EMPLOYEE_LINKS,
    DASHBOARD_SIDEBAR_LINKS
} from '../../lib/constants/navigation'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLogoutlink from './SidebarLogoutlink'
import { setCurrentShop } from '../../features/commonSlice'
import { getEmployeesByBusiness } from '../../features/userSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const { shifts: myShifts, isLoading } = useSelector((state) => state.shifts)
    const { user } = useSelector((state) => state.user)
    const [shopId, setShopId] = useState('')

    useEffect(() => {
        dispatch(getEmployeesByBusiness({ shopId: user.googleId }))
        // user && user.role === 'employee' && user.shops.length > 0 ? setShopId(user.shops[0].shopId) : setShopId('all')
        setShopId('all')
    }, [])

    useEffect(() => {
        dispatch(setCurrentShop(shopId))
    }, [shopId])

    return (
        <div className="sidebar">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span>Manemp {user.role === 'business' ? 'Business' : null}</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {user.role === 'employee' && (
                    <select
                        onChange={(e) => setShopId(e.target.value)}
                        className="sidebar-select bg-neutral-700 text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
                    >
                        <option value="all">All</option>
                        {user.shops.map((shop) => (
                            <option key={shop._id} value={shop.shopId}>
                                {shop.shopName}
                            </option>
                        ))}
                    </select>
                )}
                {user.role === 'business'
                    ? DASHBOARD_SIDEBAR_LINKS.map((item) => <SidebarLink key={item.key} item={item} />)
                    : DASHBOARD_SIDEBAR_EMPLOYEE_LINKS.map((item) => <SidebarLink key={item.key} item={item} />)}
            </div>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <SidebarLogoutlink />
            </div>
        </div>
    )
}

export default Sidebar
