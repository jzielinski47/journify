import React, { useEffect } from 'react'

import LoginPanel from '../../components/LoginPanel/LoginPanel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import image from '../../assets/cover/benz.jpg'

import { useNavigate } from 'react-router-dom'

// const arr = [video1, video2, video3, video4, video5]

import './LoginScreen.css'

const LoginScreen = ({ ws, errorMessage, id }) => {

    const navigate = useNavigate();

    useEffect(() => { id ? navigate('/dashboard', { replace: true }) : null }, [id])

    return (
        <div className='loginScreen'>
            {/* <video className="cover-fill" src={arr[Math.floor(Math.random() * arr.length)]} autoPlay loop muted /> */}
            <img className="cover-fill" src={image} />

            <div className='section'>
                <LoginPanel ws={ws} errorMessage={errorMessage} id={id} />
            </div>
            <div className='section'>
                <h1>Journify</h1>
                <p>Your personal vechicle assistant<br />{id}</p>
            </div>

            <div className='security-warning'>
                {/* <FontAwesomeIcon icon="fa-solid fa-shield-check" style={{ color: "#ffffff", }} /> */}
                <p>Secured by Jakub Zieliński © 2023</p>
            </div>

        </div>
    )
}

export default LoginScreen;