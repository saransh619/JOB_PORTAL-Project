import React, {useEffect, useState} from 'react'

const RecruiterDashboard = () => {
  const container = {
    height: "83vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#005b5b"
}

const headingOne = {
    color: "blueviolet",
    fontSize: "3.6rem"
}

const headingTwo = {
    color: "rgb(228, 83, 83)"
}

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
<h2 id="timeData" style={headingTwo}> {ctime} </h2>
<h1 style={headingOne}>Welcome to Dashboard Page</h1>
</div>

</>
)
}
export default RecruiterDashboard