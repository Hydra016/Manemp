import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShop } from '../../features/shopSlice';
import { Link } from 'react-router-dom';


const AddShop = () => {
    const { user } = useSelector(state => state.user)

    const [ data, setData ] = useState({
        name: '',
        user_id: user._id
    })
    const dispatch = useDispatch()

    console.log(data)

  return (
    <div>
        {/* <input type='text' onChange={(e) => setData({...data, name: e.target.value})} />
        <button onClick={() => dispatch(createShop(data))}>next</button> */}
    </div>
  )
}

export default AddShop