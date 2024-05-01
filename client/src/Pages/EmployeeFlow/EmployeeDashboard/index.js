import React, { useEffect } from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineHandRaised } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'
import { CiShop } from 'react-icons/ci'
import ScheduleContainer from './ScheduleContainer'
import SalaryGraph from './SalaryGraph'
import HoursGraph from './HoursGraph'
import { getEmployeeShifts, getMonthlyHours, getSalaries } from '../../../features/shiftSlice'
import { Link } from 'react-router-dom'
import UpcomingShifts from './UpcomingShifts'

const EmployeeDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { currentSelectedShop } = useSelector((state) => state.common);
    const { shifts, isLoading, currentSalary, previousSalary, monthlyHours } = useSelector((state) => state.shifts)
    
    useEffect(() => {
        dispatch(getEmployeeShifts({ employeeId: user.googleId, shopId: currentSelectedShop }))
        dispatch(getSalaries({ empId: user.googleId, shopId: currentSelectedShop }))
        dispatch(getMonthlyHours({ empId: user.googleId, shopId: currentSelectedShop }))
    }, [currentSelectedShop]);

    useEffect(() => {
        dispatch(getSalaries({ empId: user.googleId, shopId: currentSelectedShop }))
        dispatch(getMonthlyHours({ empId: user.googleId, shopId: currentSelectedShop }))
    }, [])

    console.log(currentSalary, previousSalary, monthlyHours);

    const d = new Date();
    const currentMonth = d.getMonth();

        return (
        <React.Fragment>
            <span className='text-2xl font-semibold'>Dashboard</span>
            <div className='md:grid flex flex-col grid-cols-3 gap-2 '>
            <div className='col-span-2'>
                  <div className='md:grid grid-cols-3 gap-2 flex flex-col mt-5'>
                        <div className='col-span-1 p-5 flex flex-col justify-between rounded-xl bg-orange-200'>
                        <p className="text-xl font-medium">Salary</p>
                             <p className="box-text">{currentSalary}€</p>
                             <a href="#" className="text-orange-600 md:text-xl font-medium flex items-center">
                                 request raise <HiOutlineHandRaised className="box-link" />
                            </a>
                        </div>
                        <div className='col-span-1 p-5 md:mt-0 mt-2 flex flex-col justify-between rounded-xl bg-sky-200'>
                        <p className="text-xl font-medium">Hours</p>
                             <p className="box-text">{monthlyHours.length > 0 && monthlyHours[currentMonth]}</p>
                             <Link to={'/add-shift'} className="text-blue-600 md:text-xl font-medium flex items-center">
                                 View shifts <IoTimeOutline className="box-link" />
                             </Link>
                        </div>
                        <div className='col-span-1 p-5 md:mt-0 mt-2 flex flex-col justify-between rounded-xl bg-pink-200'>
                        <p className="text-xl font-medium">My Employers</p>
                             <p className="box-text">{user && user.shops.length}</p>
                             <Link to={'/requests'} className="text-pink-600 md:text-xl font-medium flex items-center">
                                 View requests <CiShop className="box-link" />
                             </Link>
                        </div>
                    </div>  
                                 <div className="flex flex-col md:grid grid-cols-2 gap-2 md:mt-2 mt-4">
                         <div className="col-span-1">
                             <SalaryGraph currentSalary={currentSalary} previousSalary={previousSalary}/>
                         </div>
                         <div className="col-span-1">
                             <HoursGraph monthlyHours={monthlyHours} />
                         </div>
                     </div>
            </div>
            <div className='col-span-1 mt-5'>
            <ScheduleContainer />
            </div>
        </div>
        </React.Fragment>
    )
}

export default EmployeeDashboard
