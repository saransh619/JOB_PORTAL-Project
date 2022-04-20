import axios from "axios";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import instance from "../service/connection";
const EditJob = (props) => {
  console.log("myData is ", props);
  const location=useLocation();
  console.log("location is",location);
  const {postId,companyName,jobTitle,description,postDate,lastDate}=location.state;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    companyName,
    jobTitle,
    description,
    postDate,
    lastDate
  });
  console.log(formValues);
  // console.log("data new",data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(instance() + `jobpost/${postId}`, formValues).then(res => {
        // console.log("response data", res.data);
        navigate('/latestjob');  //redirect to latest job page
    }).catch(err => {
        console.log("Error is", err);
    })
  }
  
  return (
    <>
    <div>
   <h1 className="text-red-500 text-center text-5xl mt-10">
        Edit Job
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
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto" type="submit">
              UPDATE
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

export default EditJob