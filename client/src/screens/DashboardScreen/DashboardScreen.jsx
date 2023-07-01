import React, { useEffect } from 'react'
import './DashboardScreen.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { client as ws } from '../..'

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
                    <ul>Home</ul>
                    <ul>Dashboard</ul>
                    <ul>Settings</ul>

                    <ul className='red'>Log out</ul>
                </nav>
            </div>
            <div className='dashboard'>
                <div className='bar'></div>
                <div className='display'></div>
            </div>



        </div >
    )
}


export default DashboardScreen;
