import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dashboard } from './components/pages/Dashboard';
import Footer from './components/Footer';
import AddJob from './components/pages/AddJob';
import LatestJob from './components/pages/LatestJob';
import JobApply from './components/pages/JobApply';
import ApplyJobList from './components/pages/ApplyJobList';
import EditJob from './components/pages/EditJob';
import ProtectedRoutes from './ProtectedRoutes';
import Logout from './components/pages/Logout';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import RecruiterDashboard from './components/pages/RecruiterDashboard';
import { createContext, useReducer } from 'react';

import { initialState, reducer } from './reducer/UseReducer';
import RecruiterList from './components/pages/RecruiterList';
import AddRecruiter from './components/pages/AddRecruiter';
import ForgetPassword from './components/pages/ForgetPassword';
import ResetPassword from './components/pages/ResetPassword';

// 1. contextAPI 
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/signup' element={<RegisterForm />}></Route>
      <Route path='/latestjob' element={<LatestJob />}></Route>
      <Route path='/logout' element={<Logout />}></Route>
      <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
      <Route path='/resetpassword' element={<ResetPassword/>}></Route>

      <Route element={<ProtectedRoutes />} >
        <Route path='/addjob' element={<AddJob />}></Route>
        <Route path="/userdashboard" element={<UserDashboard />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/recruiterdashboard" element={<RecruiterDashboard />}></Route>
        <Route path="/recruiterlist" element={<RecruiterList />}></Route>
        <Route path="/addrecruiter" element={<AddRecruiter />}></Route>

        <Route path='/jobapply' element={<JobApply />}></Route>
        <Route path='/applyjoblist' element={<ApplyJobList />}></Route>
        <Route path='/editjob/:id' element={<EditJob />}></Route>
        {/* <Route path='/approvePost/:id' element={<RecruiterList />}></Route> */}
        <Route path='/deletejob/:id' element={<LatestJob />}></Route>  
      </Route>
      <Route path='*' element={<h1>Error Page Not Found</h1>}></Route>
    </Routes>
  );
};

  function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Navbar />
            <Routing />
          </BrowserRouter>
        </UserContext.Provider>
        <Footer />
      </>
    );
  }

  export default App;
