import React from 'react'

const Dashboard = ({ garage }) => {
    return (
        <div>
            {garage.map((item, index) => (
                <YourChildComponent key={index} data={item} />
            ))}
        </div>
    )
}

const YourChildComponent = ({ data }) => {
    return <div>{JSON.stringify(data)}</div>;
};

export default Dashboard