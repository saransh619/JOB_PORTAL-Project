import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import jobportalAuthService from "../service/jobportal.auth.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormData from "form-data";

const ForgetPassword = () => {
    const [formValues, setFormValues] = useState({
        userEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('checkemail',formValues.userEmail);
        console.log(data);
        jobportalAuthService.ForgetPassword(data).then(res => {
            console.log("email", res)
            // toastify animation for Forget password message
            toast.success(" Please check your mail", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            console.log("Error is", err);
            // toastify animation for failed message
            toast.error("Invalid Credentials", {
                autoClose: 1000,
            });
        })

        setFormValues({
            userEmail: '',
        });

    }

    return (
        <>
            <div>
                <h1 className="text-red-500 text-center text-5xl mt-10">
                    Confirm Email
                </h1>
                <div className="w-full max-w-xs m-auto mt-20">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameaddress">
                                Email address
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="abc@gmail.com" autoComplete='true'
                                name="userEmail"
                                value={formValues.userEmail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
                                CONFIRM
                            </button>

                        </div>
                    </form>

                </div>
            </div>
            {/* toastify animation conatiner  */}
            <ToastContainer />
        </>

    )
}

export default ForgetPassword