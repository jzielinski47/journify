import React, { useEffect } from 'react'
import './DashboardScreen.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { client as ws } from '../..'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const DashboardScreen = ({ garage }) => {

    const navigate = useNavigate();

    const token = useSelector((state) => state.user.value.token)
    useEffect(() => { token ? null : navigate('/', { replace: true }) }, [token])

    const get = (id, subject) => ws.send(`%get&subject=${subject}`);
    useEffect(() => get(token, 'cars'), [])

    useEffect(() => { console.log(garage) }, [garage])

    return (
        <div className='DashboardScreen'>
            <div className='navigation'>

                <h1>Journify</h1>

                <hr />

                <nav>
                    <ul onClick={() => navigate('/dashboard', { replace: true })}><FontAwesomeIcon icon="fa-solid fa-house" /> Home</ul>
                    <ul onClick={() => navigate('/dashboard', { replace: true })}><FontAwesomeIcon icon="fa-solid fa-layer-group" /> Dashboard</ul>
                    <ul onClick={() => navigate('/dashboard', { replace: true })}><FontAwesomeIcon icon="fa-solid fa-gear" /> Settings</ul>

                    <ul className='red' onClick={() => navigate('/', { replace: true })}> <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> Log out</ul>
                </nav>
            </div>
            <div className='dashboard'>
                <div className='bar'>
                    <div className='section'>
                        <h2>Dashboard</h2>
                    </div>
                    <div className='section'>
                        <p>General</p>
                        <p>Profile</p>
                        <p>Garage</p>
                    </div>
                </div>
                <div className='display'></div>
            </div>



        </div >
    )
}


export default DashboardScreen;
