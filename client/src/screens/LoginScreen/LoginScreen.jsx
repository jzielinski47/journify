import React, { useEffect } from 'react'

import LoginPanel from '../../components/LoginPanel/LoginPanel'

// import image from '../../assets/cover/benz.jpg'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authorize, unauthorize } from '../../slices/userSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './LoginScreen.css';

library.add(fas)

const LoginScreen = ({ errorMessage, id }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.user?.value?.token ?? null);

    useEffect(() => { id ? dispatch(authorize({ token: id })) : null }, [id])
    useEffect(() => { token ? navigate('/dashboard', { replace: false }) : null }, [token])

    return (
        <div className='LoginScreen'>
            {/* <video className="cover-fill" src={arr[Math.floor(Math.random() * arr.length)]} autoPlay loop muted /> */}
            <img className="cover-fill" src={'https://i.imgur.com/PsDx7bs.jpg'} />

            <div className='section'>
                <LoginPanel errorMessage={errorMessage} id={id} />
            </div>
            <div className='section hero'>
                <h1>Journify</h1>
                <p>Your personal vechicle assistant<br />{id}</p>
            </div>

            <div className='security-warning'>
                <FontAwesomeIcon icon="fa-solid fa-shield" size='lg' style={{ color: "#ffffff", }} />
                <p>Secured by Jakub Zieliński © 2023</p>
            </div>

        </div>
    )
}

export default LoginScreen;