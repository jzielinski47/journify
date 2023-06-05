import React from 'react'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import './LoginPanel.css'
import { client as ws } from '../..'
import { useSelector } from 'react-redux'

const LoginPanel = ({ errorMessage }) => {

    const [isPasswordShown, setIsPasswordShown] = useState(false)

    const [login, setLogin] = useState('');
    const [passwd, setPasswd] = useState('');

    const sendLoginData = () => ws.send(`%login&login=${login}&passwd=${passwd}`)
    const sendRegisterData = () => ws.send(`%register&login=${login}&passwd=${passwd}`)
    const token = useSelector((state) => state.user?.value?.token ?? null);

    return (
        <div className='loginPanelWrapper'>

            <div className='headline wrapper'>
                <FontAwesomeIcon icon="fa-solid fa-address-card" bounce size='2xl' style={{ color: "#ffffff" }} onClick={() => setIsPasswordShown(!isPasswordShown)} />
                <h2>Sign in</h2>
                <p className='desc'>Connect your Journify account.<br />Don't have an account? <span className='fake-link'>Sign up!</span></p>
                <p>{token}</p>
            </div>

            <div className='essencial wrapper'>
                <div className='inputWrapper'>
                    <span className='label'>Username</span>
                    <input type='text' onChange={(e) => setLogin(e.target.value)} placeholder='Username' />
                </div>
                <div className='inputWrapper'>
                    <span className='label'>Password</span>
                    <input type={isPasswordShown ? 'text' : 'password'} onChange={(e) => setPasswd(e.target.value)} placeholder='Password' />
                </div>
                <p className='hint'>Forgot password?</p>
                <p className='error'>{errorMessage}</p>
            </div>

            <div className='buttons wrapper'>
                <button className='btn-hmp' onClick={() => sendLoginData()}>Login</button>
                <button className='btn-mmp' onClick={() => sendRegisterData()}>Sign up</button>
            </div>

        </div>
    )
}

export default LoginPanel;