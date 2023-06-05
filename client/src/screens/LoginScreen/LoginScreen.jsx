import React, { useEffect } from 'react'

import LoginPanel from '../../components/LoginPanel/LoginPanel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import image from '../../assets/cover/benz.jpg'

import { useNavigate } from 'react-router-dom'
import { authorize, unauthorize } from '../../store'
import { useDispatch, useSelector } from 'react-redux'

import './LoginScreen.css'

const LoginScreen = ({ errorMessage, id }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.user.value.token)
    const ws = useSelector((state) => state.ws.value.webSocket)

    useEffect(() => { id ? dispatch(authorize({ token: id })) : null }, [id])
    useEffect(() => { token ? navigate('/dashboard', { replace: true }) : null }, [token])

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
                <FontAwesomeIcon icon="fa-solid fa-shield-check" style={{ color: "#ffffff", }} />
                <p>Secured by Jakub Zieliński © 2023</p>
            </div>

        </div>
    )
}

export default LoginScreen;