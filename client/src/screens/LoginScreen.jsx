import React from 'react'

import LoginPanel from '../components/LoginPanel/LoginPanel'
import video from '../assets/video.mp4'

import './LoginScreen.css'

const LoginScreen = ({ ws, errorMessage, id }) => {
    return (
        <div className='loginScreen'>
            <video src={video} autoPlay loop muted />
            <div className='section'>
                <LoginPanel ws={ws} errorMessage={errorMessage} id={id} />
            </div>
            <div className='section'>
                <h1>Journify</h1>
                <p>{id}</p>
            </div>
        </div>
    )
}

export default LoginScreen;