import React, { useEffect } from 'react'
import './DashboardScreen.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const DashboardScreen = ({ id }) => {

    const navigate = useNavigate();

    const token = useSelector((state) => state.user.value.token)
    useEffect(() => { token ? null : navigate('/', { replace: true }) }, [token])

    return (
        <div>
            <nav>
                <ul>Garage</ul>
            </nav>

            <div className='Panel'>
                <h2>Title</h2>
                <p>description</p>

                <button>Add car</button>
            </div>

        </div>
    )
}


export default DashboardScreen;
