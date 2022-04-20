import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../service/connection";
import jobportalAuthService from "../service/jobportal.auth.service";
// import AuthUser from "../service/AuthUser";
import LatestJob from "./LatestJob";
const AddJob = () => {
  const navigate = useNavigate();
  // const { http, setToken } = AuthUser();
  const [formValues, setFormValues] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    postDate: '',
    lastDate: '',
  });
  // console.log(formValues);
  const [data, SetData] = useState([]);
  // console.log("data new",data);

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
      jobportalAuthService.addJob(formValues).then(res => {
        // console.log("res", res);
        SetData(res.data);
        navigate('/latestjob');
      }).catch(err => {
        console.log("Error is", err);
      })
    }
  }
  

  const validate = (values) => {
    const errors = {};
    // for company name validation 
    if (!values.companyName) {
      errors.companyName = 'Company name is required';
    }
    // for job title name validation 
    if (!values.jobTitle) {
      errors.jobTitle = 'JOb Title is required';
    }
    // for description name validation 
    if (!values.description) {
      errors.description = 'Description is required';
    }
    // for last date is required 
    if (!values.lastDate) {
      errors.lastDate = 'Last date is required';
    }
    // for post date is required
    if (!values.postDate) {
      errors.postDate = 'Post date is required';
    }

    return errors;
  }

  return (
    <>
      <div>
      
        <h1 className="text-red-500 text-center text-5xl mt-10">
          Add Job
        </h1>
        <div className="w-full max-w-xl m-auto mt-20">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="companyName"
                value={formValues.companyName}
                onChange={handleChange}
                name="companyName"
              />
            </div>
            <div className="error text-red-700">{formError.companyName}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
                Job Title
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Job Title"
                value={formValues.jobTitle}
                onChange={handleChange}
                name="jobTitle"
              />
            </div>
            <div className="error text-red-700">{formError.jobTitle}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
                Description
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lname" type="text" placeholder="Description"
                value={formValues.description}
                onChange={handleChange}
                name="description"
              />
            </div>
            <div className="error text-red-700">{formError.description}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Post Date
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="postDate" type="date" placeholder="Post Date"
                value={formValues.postDate}
                onChange={handleChange}
                name="postDate"
              />
            </div>
            <div className="error text-red-700">{formError.postDate}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Last Date
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastDate" type="date" placeholder="Last Date"
                value={formValues.lastDate}
                onChange={handleChange}
                name="lastDate"
              />
            </div>
            <div className="error text-red-700">{formError.lastDate}</div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto" type="submit">
                SUBMIT
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

export default AddJob