import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { singupUser } from '../../../features/userSlice'
import { Navigate } from 'react-router-dom'
import '../styles.css'

const Register = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        id: user._id,
        shopName: '',
        password: '',
        shopType: 'restaurant'
    })

    console.log(data)

    return (
        <div className="flex flex-col">
            <label>Name</label>
            <input type="text" onChange={(e) => setData({ ...data, shopName: e.target.value })} />
            <label>Password</label>
            <input type="text" onChange={(e) => setData({ ...data, password: e.target.value })} />
            <select
                name="mySelect"
                onChange={(e) => {
                    setData({ ...data, shopType: e.target.value })
                }}
            >
                <option value="restaurant">Restaurant</option>
                <option value="retail_store">Retail store</option>
            </select>
            <button onClick={() => dispatch(singupUser(data))}>Complete Setup</button>
            {user.shopName && <Navigate to="/" />}
        </div>
    )
}

export default Register
