import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import jobportalAuthService from "../service/jobportal.auth.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../App";

const LoginForm = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        userName: '',
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
            jobportalAuthService.login(formValues).then(res => {
                // console.log("response data", res);
                dispatch({ type: "LOGINOUT", payload: true });
                const fetching = JSON.parse(localStorage.getItem('user'));
                var role = "null";
                if (fetching) {
                    role = fetching.user.role[0].roleName;
                    // console.log('Role Defined is ', role);
                }

                // ........normal way to do login..........
                // for User navigate
                // role === 'User' && (
                //     navigate('/jobapply')
                // )
                // for Admin navigate
                //  role === 'Admin' && (
                //     navigate('/admindashboard')
                // )
                // // for Recruiter navigate
                // role === 'Recruiter' && (
                //     navigate('/applyjoblist')
                // )

                // ............for toastify to show while login for some time duration........
                role === 'User' && (
                    setTimeout(() => {
                        navigate('/jobapply')
                    }, 2000)
                )
                role === 'Admin' && (
                    setTimeout(() => {
                        navigate('/admindashboard')
                    }, 2000)
                )
                role === 'Recruiter' && (
                    setTimeout(() => {
                        navigate('/applyjoblist')
                    }, 2000)
                )

                // toastify animation for login success message
                toast.success("Login Successful", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => {
                console.log("Error is", err);
                // toastify animation for login failed message
                toast.error("Invalid Credentials", {
                    autoClose: 1000,
                });
            })
        }
    }

    const validate = (values) => {
        const errors = {};
        // for user name validation
        if (!values.userName) {
            errors.userName = 'User name is required';
        }
        // for user password validation
        if (!values.userPassword) {
            errors.userPassword = 'User password is required';
        }
        return errors;
    }


    return (
        <>
            <div>
                <h1 className="text-red-500 text-center text-5xl mt-10">
                    Login Form
                </h1>
                <div className="w-full max-w-xs m-auto mt-20">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameaddress">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="username" autoComplete='true'
                                name="userName"
                                value={formValues.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="error text-red-700">{formError.userName}</div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type={passwordShown ? "text" : "password"} placeholder="******************" autoComplete='true'
                                name="userPassword"

                                value={formValues.userPassword}
                                onChange={handleChange}
                            // onClick={togglePasswordVisiblity}
                            />
                            <span style={{
                                position: "absolute",
                                left: "58rem",
                                top: "20rem",
                            }}>
                                {passwordShown ? <i className="fa-solid fa-eye" onClick={togglePasswordVisiblity} /> : <i className="fa-solid fa-eye-slash" onClick={togglePasswordVisiblity} />}
                            </span>
                        </div>
                        <div className="error text-red-700">{formError.userPassword}</div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign In
                            </button>
                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forgetpassword">
                                Forgot Password?
                            </Link>
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

export default LoginForm