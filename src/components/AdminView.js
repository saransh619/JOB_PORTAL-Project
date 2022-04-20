import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminView = () => {
    const fetching = JSON.parse(localStorage.getItem('user'));
    var role = "null";
    if (fetching) {
        role = fetching.user.role[0].roleName;
    }
  return (
        role === 'Admin' && (
          <>
            <li className="nav-item ">
              <i className="fa-solid fa-house text-light"></i>
              <NavLink className="nav-link active text-light d-inline p-0 " aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item mx-md-3">
              <i className="fa fa-user text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/admindashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className=" dropDownList nav-link text-light dropdown-toggle d-inline" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Recruiters
              </NavLink>
              <ul className="dropdown-menu fade-up dropDowning z-10" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/addrecruiter">Add Recruiter</NavLink></li>
                <li><NavLink className="dropdown-item" to="/recruiterlist">Recruiters List</NavLink></li>
              </ul>
            </li>
            <li className="nav-item mx-md-3">
              <i className="fa-solid fa-users text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/latestjob">Latest Job</NavLink>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-right-to-bracket text-light"></i>
              <NavLink className="nav-link text-light d-inline" to="/logout">Logout</NavLink>
            </li>
          </>
        )
  )
}

export default AdminView