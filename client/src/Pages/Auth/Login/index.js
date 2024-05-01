import React, { useState } from 'react'
import AuthNav from './AuthNav'
import { HiLockClosed, HiUserCircle, HiChevronRight } from 'react-icons/hi'
import { FaGooglePlusG } from 'react-icons/fa' 
import { Link, useLocation, useParams } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import '../styles.css'

const Login = () => {
    const location = useLocation()
    const { loginType } = location.state;
    const [data, setData] = useState({ 
        _id: '',
        password: ''
     })

    return (
        <div className="landing">
            <AuthNav />
            <div className="general-padding">
                <div className='login-container'> 
                    <img src='login.png' />
                    {loginType === 'business' &&
                    <div className='login-form'>
                    <p>Welcome Back!</p>
                    <span>Login to continue</span>
                    <div>
                        <div className='login-input'>
                        <HiUserCircle className='login-icon' />
                        <input type='text' placeholder='Enter Shop ID' onChange={(e) => setData({ ...data, _id: e.target.value }) } />
                        </div>
                        <div className='login-input'>
                        <HiLockClosed className='login-icon' />
                        <input type='password' placeholder='Enter Password' onChange={(e) => setData({ ...data, password: e.target.value }) } />
                        </div>
                    </div>
                    <div className='login-btn-container'>
                    <button onClick={() => console.log(data)} className='primary-btn login-btn'>
                        Login
                        <HiChevronRight className='landing-btn-icon' />
                    </button>
                    <Link className='forgot-link'>
                        Forgot Password?
                    </Link>
                    </div>
                    <div className='boundary'>
                        <div></div>
                        <span>or</span>
                    </div>
                    <div>
                        <Link to={'http://localhost:5000/auth/google'} className='primary-btn google-link'>
                            <FaGooglePlusG className='google-icon'/>
                            Login with google
                        </Link>
                    </div>
                </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
