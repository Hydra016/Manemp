import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const LoadingScreen = () => {
  return (
    <div className='loadng-container'><InfinitySpin width="200" color="#0f172a" /></div>
  )
}

export default LoadingScreen