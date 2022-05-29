import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import jobportalAuthService from "../service/jobportal.auth.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormData from "form-data";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [cpasswordShown, setCPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleCPasswordVisiblity = () => {
        setCPasswordShown(!cpasswordShown);
    };

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const tokenData = searchParams.get('token');

    const formik = useFormik({
        initialValues: {
            userPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            userPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, "6-12 characters, one uppercase, one lowercase, one number, one special character").required("Password is Required"),
            confirmPassword: Yup.string().oneOf([Yup.ref('userPassword'), null], 'Passwords must match').required('Confirm Password is Required')
        }),
        onSubmit: (values) => {
            const data = new FormData();
            data.append('password', values.userPassword);
            console.log(data);
            jobportalAuthService.ResetPostPassword(data, tokenData).then(res => {
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
                // console.log("password", res)
                // toastify animation for password succesfully changed
                const toastData = toast.success("You have successfully changed your password", {
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
                // toastify animation for password don't changed
                toast.error("Invalid Credentials", {
                    autoClose: 1000,
                });
            })
        }
    });

    return (
        <>
            <div>
                <h1 className="text-red-500 text-center text-5xl mt-10">
                    Reset Your Password
                </h1>
                <div className="w-full max-w-xs m-auto mt-20">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameaddress">
                                Choose New Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={passwordShown ? "text" : "password"} placeholder="Enter new password" autoComplete='true'
                                value={formik.values.userPassword}
                                onChange={formik.handleChange}
                                name="userPassword"
                                onBlur={formik.handleBlur}
                            />
                            <span style={{
                                position: "absolute",
                                left: "58rem",
                                top: "14.4rem",
                            }}>
                                {passwordShown ? <i className="fa-solid fa-eye" onClick={togglePasswordVisiblity} /> : <i className="fa-solid fa-eye-slash" onClick={togglePasswordVisiblity} />}
                            </span>
                        </div>
                        {formik.errors.userPassword && formik.touched.userPassword ? (
                            <span className="error text-red-700">{formik.errors.userPassword}</span>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameaddress">
                                Confirm Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={cpasswordShown ? "text" : "password"} placeholder="Confirm new password" autoComplete='true'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                name="confirmPassword"
                                onBlur={formik.handleBlur}
                            />
                            <span style={{
                                position: "absolute",
                                left: "58rem",
                                top: "20rem",
                            }}>
                                {cpasswordShown ? <i className="fa-solid fa-eye" onClick={toggleCPasswordVisiblity} /> : <i className="fa-solid fa-eye-slash" onClick={toggleCPasswordVisiblity} />}
                            </span>
                        </div>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                            <div className="error text-red-700">{formik.errors.confirmPassword}</div>
                        ) : null}

                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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

export default ResetPassword