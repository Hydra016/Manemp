import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openShiftModal } from '../../features/commonSlice';
import { storeTemporaryShifts } from '../../features/shiftSlice';
import axios from 'axios';

const ShiftModal = ({ isOpen }) => {
    const dispatch = useDispatch()
    const { temporaryShifts } = useSelector(state => state.shifts);
    const [employee, setEmployee] = useState({});

    const getCurrentEmployee = async (data) => {
        const response = await axios.post('http://localhost:5000/api/employee', data);
        setEmployee(response.data.employee[0])
    }

    useEffect(() => {
        temporaryShifts && temporaryShifts.length > 0 && getCurrentEmployee({empId: temporaryShifts.slice(-1)[0].employeeId})
        // console.log('efg')
    }, [temporaryShifts])

    if (!isOpen) {
        return null;
    }
    
    const removeShifts = () => {
        if(temporaryShifts && temporaryShifts.length > 0) {
            const newShifts = temporaryShifts.slice(0, -1)
            dispatch(storeTemporaryShifts(newShifts));
            sessionStorage.setItem('shifts', JSON.stringify(newShifts));   
        }
    }   

    return (
        <div className="modal">
            <div className="modal-schedule">
                <div className='modal-main'>
                    <img src={employee && employee.picture} />
                <div className='schedule-modal-container'>
                <p className='schedule-modal-text'>{employee && employee.givenName}</p>
                    <p className='schedule-modal-text'>{temporaryShifts.slice(-1)[0].hours} hours</p>
                    <p className='schedule-modal-text'>{employee && employee.salary !== null ? `current salary: ${employee.salary} €` : 'salary not set'}</p>
                </div>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={() => {
                            dispatch(openShiftModal(false));
                        }}
                    >
                        Set
                    </button>
                    <button
                        onClick={() => {
                            removeShifts()
                            dispatch(openShiftModal(false));
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShiftModal;
