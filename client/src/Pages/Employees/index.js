import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleEmployee from './SingleEmployee'
import './styles.css'
import LoadingScreen from '../../components/shared/LoadingScreen'
import { getEmployeesByBusiness } from '../../features/userSlice'
import { CiFaceFrown } from 'react-icons/ci'

const Employees = () => {
    const { user, employees, isLoading } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        user && dispatch(getEmployeesByBusiness({ shopId: user.googleId }))
    }, [])

    return (
        <div className="businessEmployees-container requests-container">
            {isLoading ? (
                <LoadingScreen />
            ) : employees && employees.length > 0 ? (
                <table className="request-table">
                    <thead>
                        <tr>
                            <td className="table-cell">Employee</td>
                            <td className="table-cell">Name</td>
                            <td className="table-cell">Joined date</td>
                            <td className="table-cell">hourly salary</td>
                            <td className="table-cell">Remove</td>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            return <SingleEmployee key={employee._id} employee={employee} shopId={user.googleId} />
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="no-request">
                    <div className="no-request-container">
                        <CiFaceFrown className="no-request-icon" />
                        <span>No employees yet</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Employees
