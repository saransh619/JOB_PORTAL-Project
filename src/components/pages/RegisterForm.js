import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jobportalAuthService from "../service/jobportal.auth.service";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userName: '',
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const [formError, setFormError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      jobportalAuthService.register(formValues).then(res => {
        navigate('/login');
      }).catch(err => {
        console.log("Error is", err);
      })
    }
  }

  const validate = (values) => {
    var errors = {};
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // for user name validation
    if (!values.userName) {
      errors.userName = 'User name is required';
    }
    // for first name validation 
    if (!values.userFirstName) {
      errors.userFirstName = 'First name is required';
    }
    // for last name validation 
    if (!values.userLastName) {
      errors.userLastName = 'Last name is required';
    }

    // for email address validation 
    if (!values.userEmail) {
      errors.userEmail = 'Email address is required';
    } else if (!regex.test(values.userEmail)) {
      errors.userEmail = 'Email address is not valid';
    }

    jobportalAuthService.getAllRegisteredUsers().then(res => {
      // console.log("response data", res.data);
      var emailVerify = res.data;
      for (var i = 0; i < emailVerify.length; i++) {
        if (emailVerify[i].userEmail === values.userEmail) {
          console.log("Email already exists");
          errors.userEmail = 'Email address already exists';
        }
      }
    }).catch(err => {
      console.log("Error is", err);
    })

    // for userPassword validation
    if (!values.userPassword) {
      errors.userPassword = "userPassword is required";
    } else if (values.userPassword.length < 4) {
      errors.userPassword = "userPassword must be more than 4 characters";
    } else if (values.userPassword.length > 10) {
      errors.userPassword = "userPassword cannot exceed more than 10 characters";
    }
    return errors;
  }
  
  return (
    <>
      <div>
        <h1 className="text-red-500 text-center text-5xl mt-10">
          Registration Form
        </h1>
        <div className="w-full max-w-xl m-auto mt-20">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="Username"
                value={formValues.userName}
                onChange={handleChange}
                name="userName"
              />
            </div>
            <div className="error text-red-700">{formError.userName}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="First Name"
                value={formValues.userFirstName}
                onChange={handleChange}
                name="userFirstName"
              />
            </div>
            <div className="error text-red-700">{formError.userFirstName}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="Last Name"
                value={formValues.userLastName}
                onChange={handleChange}
                name="userLastName"
              />
            </div>
            <div className="error text-red-700">{formError.userLastName}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" autoComplete='true' placeholder="Email address"
                value={formValues.userEmail}
                onChange={handleChange}
                name="userEmail"
              />
            </div>
            <div className="error text-red-700">{formError.userEmail}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" autoComplete='true' placeholder="Password"
                value={formValues.userPassword}
                onChange={handleChange}
                name="userPassword"
              />
            </div>
            <div className="error text-red-700">{formError.userPassword}</div>

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
    </>
  )
}

export default RegisterForm