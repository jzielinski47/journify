import React from 'react'

import LoginPanel from '../components/LoginPanel/LoginPanel'

import video1 from '../assets/video1.mp4'
import video2 from '../assets/video2.mp4'
import video3 from '../assets/video3.mp4'
import video4 from '../assets/video4.mp4'
import video5 from '../assets/video5.mp4'

const arr = [video1, video2, video3, video4, video5]

import './LoginScreen.css'

const LoginScreen = ({ ws, errorMessage, id }) => {
    return (
        <div className='loginScreen'>
            <video src={arr[Math.floor(Math.random() * arr.length)]} autoPlay loop muted />

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