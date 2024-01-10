import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const Dashboard = ({ garage }) => {
    return (
        <div>
            {garage.map((item, index) => (
                <SingleCarComponent key={index} data={item} />
            ))}
        </div>
    )
}

const SingleCarComponent = ({ data }) => {


    return (
        <div className='carmodel'>
            <img className='brandlogo' height={'20px'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/BMW_logo_%28white_%2B_grey_background_circle%29.svg/1200px-BMW_logo_%28white_%2B_grey_background_circle%29.svg.png' />
            <span className='h'>{data.brand}</span>
            <span className='d'>{data.model}</span>
            <span className='d'>{data.year}</span>
            <span className='d'>{data.owner}</span>
        </div>

    )


    // return <div>{JSON.stringify(data)}</div>;
};


export default Dashboard;