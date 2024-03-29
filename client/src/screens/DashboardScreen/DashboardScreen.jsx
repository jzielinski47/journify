import React, { useEffect, useState } from 'react'
import './DashboardScreen.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authorize, unauthorize } from '../../slices/userSlice'

import { client as ws } from '../..'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import Home from './SubScreenComponents/Home';
import Dashboard from './SubScreenComponents/Dashboard';
import Settings from './SubScreenComponents/Settings';

import NavigationBar from '../../components/NavigationBar/NavigationBar'

const DashboardScreen = ({ garage }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.value.token);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => { token ? null : navigate('/', { replace: true }) }, [token])

    const get = (id, subject) => ws.send(`%get&subject=${subject}`);
    useEffect(() => get(token, 'cars'), [token])

    const logOut = () => {
        if (!isLoggingOut) {
            setIsLoggingOut(true); // Disable logout functionality after first click
            ws.send('%logout');
            dispatch(unauthorize());
        }
    }

    useEffect(() => { console.log(garage) }, [garage])

    const [activeTab, setActiveTab] = useState('home');
    const handleTabChange = (tabName) => setActiveTab(tabName);

    return (
        <div className='DashboardScreen'>
            <div className='navigation'>

                <h1>Journify</h1>

                <hr />

                <nav>
                    <ul onClick={() => handleTabChange('home')}><FontAwesomeIcon icon="fa-solid fa-house" /> Home</ul>
                    <ul onClick={() => handleTabChange('dashboard')}><FontAwesomeIcon icon="fa-solid fa-layer-group" /> Dashboard</ul>
                    <ul onClick={() => handleTabChange('settings')}><FontAwesomeIcon icon="fa-solid fa-gear" /> Settings</ul>

                    <ul className='red' onClick={() => logOut()}> <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> Log out</ul>
                </nav>
            </div>
            <div className='dashboard'>
                <NavigationBar title={activeTab} />
                <div className='display'>
                    {activeTab === 'home' && <Home />}
                    {activeTab === 'dashboard' && <Dashboard garage={garage} />}
                    {activeTab === 'settings' && <Settings />}
                </div>
            </div>



        </div >
    )
}


export default DashboardScreen;
