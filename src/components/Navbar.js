import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App'
import '.././App.css'
import UserView from './UserView'
import AdminView from './AdminView'
import RecruiterView from './RecruiterView'
import GuestView from './GuestView'

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {

    return (
      <>
      {/* for User View  */}
        <UserView/>

        {/* for Admin View  */}
        <AdminView/>
        
        {/* for Recruiter View  */}
        <RecruiterView/>

        {/* for Guest/Default View  */}
        <GuestView/>
      </>
    )
  }
  return (
    <>
      <nav style={{
        position: "sticky",
        zIndex: "10",
        top: "0px",
      }} className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-white fs-2" to="/">JobsPortal</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon bg-white"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar