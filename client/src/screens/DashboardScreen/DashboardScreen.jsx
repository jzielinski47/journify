import React, { useEffect } from 'react'
import './DashboardScreen.css'

import { useNavigate } from 'react-router-dom'


const DashboardScreen = ({ id }) => {

    const navigate = useNavigate();

    useEffect(() => { id ? null : navigate('/', { replace: true }) }, [id])

    return (
        <div>{id}</div>
    )
}


export default DashboardScreen;
