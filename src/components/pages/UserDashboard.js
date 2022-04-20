import React, { useState, useEffect } from 'react';
const UserDashboard = () => {
     useEffect(() => {
        fetchData();
    }, [])
    const userData = JSON.parse(localStorage.getItem('user'));
    const fullName = `${userData.user.userFirstName} ${userData.user.userLastName}`;
    const [data, setData] = useState(fullName);
    function fetchData (){
        setData(fullName);
    }

// CSS Start 
    const container = {
        height: "83vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#005b5b"
    };
    const headingOne = {
        color: "blueviolet",
        fontSize: "3.6rem"
    }
    const headingTwo = {
        color: "rgb(228, 83, 83)"
    }
    const headingThree = {
        fontSize: "3.2rem",
        color: "cornsilk",
        textTransform: "uppercase",
        textShadow:"5px 7px 10px darkgrey"
    }
// CSS End 

let [ctime, setCTime] = useState();
useEffect(() => {
    const timer = setInterval(() => {
        setCTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
        clearInterval(timer);
    }
}, [])

    return (
        <>
            <div className="container-fluid" style={container}>
                <h2 style={headingTwo}> {ctime} </h2>
                <h1 style={headingOne}>Welcome to Dashboard Page</h1>
                <h3 style={headingThree}>{data}</h3>
            </div>
        </>
    )
}
export default UserDashboard