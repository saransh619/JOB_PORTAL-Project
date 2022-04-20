import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobportalAuthService from "../service/jobportal.auth.service";
import FormData from "form-data";
const JobApply = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // resume: '',
    skills: ''
  });

  const [file, setFile] = useState();

  const [formError, setFormError] = useState({});

  const send = (e) => {
    e.preventDefault();
    const data = new FormData();
    const applyJob={
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      resume: formValues.resume,
      skills: formValues.skills
    }
    data.append('applyJob', JSON.stringify(applyJob));
    data.append('file', file);

    // for(let key in formValues){
    //   data.append(key,formValues[key]);
    // }

    const errors = validate(formValues);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
    jobportalAuthService.addJobApply(data).then(res => {
      // console.log("response data", res.data);
      navigate("/dashboard");
    }).catch(err => {
      console.log("error", err);
    });
  }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setFormValues({
      ...formValues,
      [name]: value
    });
    }

    // const [formError, setFormError] = useState({});
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = validate(formValues);
  //   setFormError(errors);
  //   if (Object.keys(errors).length === 0) {
  //     // jobportalAuthService.addJobApply(formValues,"multipart/form-data").then(res=>{
  //     //   console.log("response apply job0",res);
  //     // }).catch(error=>{
  //     //   console.log("error catch",error)
  //     // })
  //   }
  // }

  const validate = (values) => {
    const errors = {};
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // for first  name validation
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    // for last name validation
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    // for email name validation
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'Email address is not valid';
    }
    // for phone number validation
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    }
    // for resume validation
    // if (!values.resume) {
    //   errors.resume = 'Resume is required';
    // }
    // for skills validation
    if (!values.skills) {
      errors.skills = 'Skills is required';
    }
    return errors;
  }

return (
    <>
      <div>
        <h1 className="text-red-500 text-center text-5xl mt-10">
          Apply To Job
        </h1>
        <div className="w-full max-w-xl m-auto mt-20">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* onSubmit={handleSubmit} */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="First Name"
                value={formValues.firstName}
                onChange={handleChange}
                name="firstName"
              />
            </div>
            <div className="error text-red-700">{formError.firstName}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lname" type="text" placeholder="Last Name"
                value={formValues.lastName}
                onChange={handleChange}
                name="lastName"
              />
            </div>
            <div className="error text-red-700">{formError.lastName}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lname" type="email" placeholder="Email address"
                value={formValues.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="error text-red-700">{formError.email}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Phone Number
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Phone Number"
                value={formValues.phone}
                onChange={handleChange}
                name="phone"
              />
            </div>
            <div className="error text-red-700">{formError.phone}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Resume Upload
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="folderPath" type="file" placeholder="Upload your updated Resume"
                // value={formValues.resume}
                // onChange={handleChange}
                name="resume"
                // onChange={(e) => {uploadResume(e)}}
                onChange={(e) => {
                  const file = e.target.files[0];
                  // console.log("file",file);
                  setFile(file);
                }}
              />
            </div>
            <div className="error text-red-700">{formError.resume}</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Skills
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Your Skills"
                value={formValues.skills}
                onChange={handleChange}
                name="skills"
              />
            </div>
            <div className="error text-red-700">{formError.skills}</div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto" type="submit" onClick={send}>
                Apply
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

export default JobApply