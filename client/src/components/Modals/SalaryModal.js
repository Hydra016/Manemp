import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OpenSalaryModal } from '../../features/commonSlice'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { employeeSalary } from '../../features/userSlice'

const SalaryModal = ({ isOpen }) => {
    const dispatch = useDispatch()
    const [salary, setSalary] = useState(0)
    const { salaryModal } = useSelector((state) => state.common)

    const handleInputChange = (e) => {
        const regex = /^-?\d*(\.\d{0,1})?$/
        if (regex.test(e.target.value) || e.target.value === '') {
            setSalary(parseFloat(e.target.value) || 0)
        }
    }

    const incrementSalary = () => {
        setSalary((prevSalary) => (parseFloat(prevSalary) + 0.1).toFixed(1))
    }

    const decrementSalary = () => {
        setSalary((prevSalary) => {
            const newSalary = Math.max(0, parseFloat(prevSalary) - 0.1)
            return isNaN(newSalary) ? 0 : newSalary.toFixed(1)
        })
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Set Salary</h2>
                </div>
                <div className="modal-body salary-modal">
                    <input type="text" value={salary} onChange={handleInputChange} />
                    <div className="salary-settings">
                        <HiChevronUp className="salary-icon" onClick={incrementSalary} />
                        <HiChevronDown className="salary-icon" onClick={decrementSalary} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={() => {
                            dispatch(
                                employeeSalary({
                                    empId: salaryModal.employeeId,
                                    salary: parseInt(salary),
                                    shopId: salaryModal.shopId
                                })
                            )
                            dispatch(OpenSalaryModal({ status: false }))
                        }}
                    >
                        Set
                    </button>
                    <button onClick={() => dispatch(OpenSalaryModal({ status: false }))}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SalaryModal
