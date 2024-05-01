import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllShops } from '../../features/shopSlice';
import Shop from './Shop';

const Myshops = () => {
  const { shops } = useSelector(state => state.shop);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log(shops)

  useEffect(() => {
    dispatch(getAllShops({ user_id: user._id }))
  }, [])

  return (
    <div>
      {shops && shops.map(item => (
        <Shop item={item} />
      ))}
    </div>
  )
}

export default Myshops