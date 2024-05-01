import React from 'react'
import { HiArrowRight, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const LandingContent = () => {
    return (
        <div className="landing-content">
            <div className="content">
                From Shifts to Stock, Master it All with <span>ManEmp</span>
                <p>
                    "Your ultimate solution for seamless retail management. Effortlessly schedule employees and manage
                    inventory with ease. Simplify your retail operations today!"
                </p>
               <div className='landing-contact-btn-container'>
               <button className="nav-btn">
                    Discover more <HiArrowRight className="landing-btn-icon" />
                </button>
                <Link className="nav-btn content-link">
                    Open a business <HiPlusCircle className="landing-btn-icon" />
                </Link>
               </div>
            </div>
            <div className="image">
                <img src="./landing-img.png" />
            </div>
        </div>
    )
}

export default LandingContent
