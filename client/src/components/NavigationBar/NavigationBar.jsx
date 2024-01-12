import React from 'react'
import './NavigationBar.css'

const NavigationBar = ({ title }) => {
    return (
        <div className='bar'>
            <div className='section'>
                <h2>{title}</h2>
            </div>
            <div className='section'>
                <p>General</p>
                <p>Profile</p>
                <p>Garage</p>
            </div>
        </div>
    )
}

export default NavigationBar