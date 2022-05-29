import { useEffect, useState } from "react";
// import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import jobportalAuthService from "../service/jobportal.auth.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterForm = () => {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState('');
  // console.log(userStatus);

  const formik = useFormik({
    initialValues: {
      userName: '',
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPassword: ''
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(15, "Must be 15 characters or less").min(3, "Must be 3 characters or more").required("User name is Required")
      // username already exist check in formik 
      // .notOneOf(showData, "Username already exist"),
      ,

      userFirstName: Yup.string().max(15, "Must be 15 characters or less").min(3, "Must be 3 characters or more").required("First name is Required"),

      userLastName: Yup.string().max(15, "Must be 15 characters or less").min(3, "Must be 3 characters or more").required("Last name is Required"),

      userEmail: Yup.string().email("Invalid email address").required("Email address is Required"),

      userPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, "Must contain minimum 6 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character").required("Password is Required")
    }),

    onSubmit: (values) => {
      // console.log("form values", values);
      jobportalAuthService.register(values).then(res => {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        // toastify animation for registration success message
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 10,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(err => {
        console.log("Error is", err.response.data.message);
        setUserStatus(err.response.data.message);
        toast.error('Username or Email address already exists', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    }
  });
  return (
    <>
      <div>
        <h1 className="text-red-500 text-center text-5xl mt-10">
          Registration Form
        </h1>
        <div className="w-full max-w-xl m-auto mt-20">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="Username" id="username"
                value={formik.values.userName}
                onChange={formik.handleChange}
                name="userName"
                onBlur={formik.handleBlur}
              />
            </div>
            {/* Username already exist in database start */}
            {/* <div className="error text-red-700">{userStatus}</div> */}
            {/* Username already exist in database end */}
            {formik.errors.userName && formik.touched.userName ? (
              <div className="error text-red-700">{formik.errors.userName}</div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="First Name"
                value={formik.values.userFirstName}
                onChange={formik.handleChange}
                name="userFirstName"
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.userFirstName && formik.touched.userFirstName ? (
              <div className="error text-red-700">{formik.errors.userFirstName}</div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="Last Name"
                value={formik.values.userLastName}
                onChange={formik.handleChange}
                name="userLastName"
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.userLastName && formik.touched.userLastName ? (
              <div className="error text-red-700">{formik.errors.userLastName}</div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="Email address"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                name="userEmail"
                onBlur={formik.handleBlur}
              />
            </div>
            {/* email address already exist in database start */}
            {/* <div className="error text-red-700">{userStatus}</div> */}
            {/* email address already exist in database end  */}
            {formik.errors.userEmail && formik.touched.userEmail ? (
              <div className="error text-red-700">{formik.errors.userEmail}</div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={passwordShown ? "text" : "password"} autoComplete='true' placeholder="Password"
                value={formik.values.userPassword}
                onChange={formik.handleChange}
                name="userPassword"
                onBlur={formik.handleBlur}
              />
              <span style={{
                position: "absolute",
                left: "65rem",
                top: "36.9rem",
              }}>
                {passwordShown ? <i className="fa-solid fa-eye" onClick={togglePasswordVisiblity} /> : <i className="fa-solid fa-eye-slash" onClick={togglePasswordVisiblity} />}
              </span>
            </div>
            {formik.errors.userPassword && formik.touched.userPassword ? (
              <div className="error text-red-700">{formik.errors.userPassword}</div>
            ) : null}
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto" type="submit">
                Sign Up
              </button>

            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 IT Glance. All rights reserved.
          </p>
        </div>
      </div>
      {/* toastify animation conatiner  */}
      <ToastContainer />
    </>
  )
}

export default RegisterForm