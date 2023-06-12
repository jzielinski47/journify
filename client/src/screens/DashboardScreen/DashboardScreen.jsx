import React, { useEffect } from 'react'
import './DashboardScreen.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Panel, Table } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
// import 'rsuite/dist/rsuite.min.css';

const { HeaderCell, Cell, Column } = Table;

const DashboardScreen = () => {

    const navigate = useNavigate();

    const token = useSelector((state) => state.user.value.token)
    useEffect(() => { token ? null : navigate('/', { replace: true }) }, [token])

    return (
        <div className='DashboardScreen'>
            <nav>
                <ul>Dashboard</ul>
                <ul>Garage</ul>
            </nav>

            <div className='dashboard'>
                <Panel header="Your Garage" bordered shaded bodyFill style={{ display: 'inline-block', width: 1200 }} >

                    <Table height={400}>
                        <Column width={70} align="center" fixed>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={200} fixed>
                            <HeaderCell>Brand</HeaderCell>
                            <Cell dataKey="car" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Model</HeaderCell>
                            <Cell dataKey="city" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Year</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Owner</HeaderCell>
                            <Cell dataKey="owner" />


                        </Column>
                    </Table>
                </Panel>

                <div className='Panel'>
                    <h2>Your Cars</h2>
                    <p>description</p>

                    <button>Add car</button>
                </div>
            </div>



        </div >
    )
}


export default DashboardScreen;
