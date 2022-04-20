import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../service/connection";
import jobportalAuthService from "../service/jobportal.auth.service";
const AddRecruiter = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    companyName: '',
    // companyLogo: '',
    phoneNumber: '',
    websiteUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const [imageLogo, setImageLogo] = useState();
  const [formError, setFormError] = useState({});

  const send = (e) => {
    e.preventDefault();
    const data = new FormData();
    const addrecruiter={
      companyName: formValues.companyName,
      phoneNumber: formValues.phoneNumber,
      websiteUrl: formValues.websiteUrl,
      companyLogo:formValues.companyLogo
    }
    data.append('addRecruiter', JSON.stringify(addrecruiter));
    data.append('image', imageLogo);

    const errors = validate(formValues);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
    jobportalAuthService.createRecruiters(data).then(res => {
      // console.log("response data", res.data);
      navigate("/recruiterlist");
    }).catch(err => {
      console.log("error", err);
    });
  }
  };
  

  const validate = (values) => {
    const errors = {};
    // for company name validation 
    if (!values.companyName) {
      errors.companyName = 'Company name is required';
    }
    // for company logo validation 
    // if (!values.companyLogo) {
    //   errors.companyLogo = 'Company logo is required';
    // }
    // for phone number validation 
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    }
    // for website url validation
    if (!values.websiteUrl) {
      errors.websiteUrl = 'Website url is required';
    }
    return errors;
  }

  return (
    <>
      <div>
      
        <h1 className="text-red-500 text-center text-5xl mt-10">
          Add Recruiter
        </h1>
        <div className="w-full max-w-xl m-auto mt-20">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

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
                Company Logo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="file" placeholder="Company Logo"
              required
                value={formValues.companyLogo}
                name="companyLogo"
                onChange={(e) => {
                  const imageLogo = e.target.files[0];
                  console.log("image",imageLogo);
                  setImageLogo(imageLogo);}}
              />
            </div>
            <div className="error text-red-700">{formError.companyLogo}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
                Phone Number
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lname" type="text" placeholder="Phone Number"
                value={formValues.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
              />
            </div>
            <div className="error text-red-700">{formError.phoneNumber}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Website Url
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="postDate" type="text" placeholder="websiteUrl"
                value={formValues.websiteUrl}
                onChange={handleChange}
                name="websiteUrl"
              />
            </div>
            <div className="error text-red-700">{formError.websiteUrl}</div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto" type="submit" onClick={send}>
                Add Recruiter
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

export default AddRecruiter