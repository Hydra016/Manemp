import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiMenuAlt1, HiOutlineBell } from 'react-icons/hi'
import { openMenu, openSearchModal } from '../../features/commonSlice'
import { useMobileDetection } from '../../hooks/useMobile'
import { searchShop } from '../../features/shopSlice'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import { IoChevronDownCircleOutline } from 'react-icons/io5'
import { CiSearch } from 'react-icons/ci'
import { LuMessageSquare } from 'react-icons/lu'

const Header = () => {
    const { user } = useSelector((state) => state.user)
    const { searchedShop } = useSelector((state) => state.shop)
    const dispatch = useDispatch()
    const isMobile = useMobileDetection()
    const [shopId, setShopId] = useState('')
    const [dropDown, setDropDown] = useState(false)
    const [showDropDown, setShowDropDown] = useState(false)

    useEffect(() => {
        if (!dropDown) {
            setTimeout(() => {
                setShowDropDown(false)
            }, 100)
        } else if (dropDown) {
            setShowDropDown(true)
        }
    }, [dropDown])

    return (
        <div className={`flex bg-white px-5 py-2 ${user.role === 'business' ? 'justify-end' : 'justify-between'}`}>
            {showDropDown && <Dropdown user={user} dropDown={dropDown} />}

            {isMobile && (
                <button className="menuButton" onClick={() => dispatch(openMenu(true))}>
                    <HiMenuAlt1 />
                </button>
            )}
            <div className={`flex ${user.role === 'business' ? 'justify-end' : 'justify-between'} w-full`}>
                {user.role === 'employee' && (
                    <div className="employee-header-side">
                        <div className="employee-header-search md:flex hidden">
                            <input
                                onChange={(e) => setShopId(e.target.value )}
                                type="text"
                                placeholder="Enter shop id"
                            />
                            <button
                                onClick={() => {
                                    dispatch(searchShop({shopId}))
                                    dispatch(openSearchModal(true))
                                }}
                            >
                                <CiSearch fill="#94a3b8" />
                            </button>
                        </div>
                    </div>
                )}
                <div className="header-secondary-container">
                    <div className="header-notsub ">
                        <div className="md:flex hidden">
                            <Link className="notification">
                                <HiOutlineBell color="#94a3b8" />
                            </Link>
                            <Link className="notification">
                                <LuMessageSquare color="#94a3b8" />
                            </Link>
                        </div>
                        <div className="flex cursor-pointer" onClick={() => setDropDown(!dropDown)}>
                            <img src={user && user.picture} className="user-img" />
                            <div className="ml-1 md:flex hidden items-center">
                                <span>{user && user.role === 'business' ? user.shopName : user.givenName}</span>
                                <IoChevronDownCircleOutline
                                    className={`header-down-icon ml-1 mt-1 ${dropDown && 'dropdown-active'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
