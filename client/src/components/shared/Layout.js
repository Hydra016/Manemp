import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import './styles.css'
import { useMobileDetection } from '../../hooks/useMobile'
import Menu from './Menu'
import { useDispatch, useSelector } from 'react-redux'
import { openMenu } from '../../features/commonSlice'
import Modal from '../Modals/Modal'
import SearchModal from '../Modals/SearchModal'
import SalaryModal from '../Modals/SalaryModal'
import ShiftModal from '../Modals/ShiftModal'

const Layout = () => {
    const isMobile = useMobileDetection()
    const { menuOpened, modalOpened, searchModal, salaryModal, shiftModal } = useSelector((state) => state.common)
    const dispatch = useDispatch()

    return (
        <div className="layout">
            <Modal isOpen={modalOpened} />
            <SearchModal isOpen={searchModal} />
            <ShiftModal isOpen={shiftModal} />
            <SalaryModal isOpen={salaryModal.status} />
            {isMobile ? <Menu /> : <Sidebar />}
            <div className={menuOpened && isMobile ? 'overlay' : 'hidden'} onClick={() => dispatch(openMenu(false))}></div>
            <div className="flex flex-1 flex-col root-container">
                <div>
                    <Header />
                </div>
                <div className="p-4 main">{<Outlet />}</div>
            </div>
        </div>
    )
}

export default Layout
