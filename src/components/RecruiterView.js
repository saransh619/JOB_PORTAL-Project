import React from 'react'
import { NavLink } from 'react-router-dom'
const RecruiterView = () => {
    const fetching = JSON.parse(localStorage.getItem('user'));
    var role = "null";
    if (fetching) {
        role = fetching.user.role[0].roleName;
    }
  return (
        role === 'Recruiter' && (
          <>
            <li className="nav-item ">
              <i className="fa-solid fa-house text-light"></i>
              <NavLink className="nav-link active text-light d-inline p-0 " aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item mx-md-3">
              <i className="fa fa-user text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/recruiterdashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item mx-md-3">
              <i className="fa-solid fa-users text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/addjob">Add Job</NavLink>
            </li>
            <li className="nav-item mx-md-3">
              <i className="fa-solid fa-users text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/latestjob">Latest Job</NavLink>
            </li>
            <li className="nav-item mx-md-3">
              <i className="fa-solid fa-users text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/applyjoblist">View Apply List</NavLink>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-right-to-bracket text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/logout">Logout</NavLink>
            </li>
          </>
        )
  )
}

export default RecruiterView