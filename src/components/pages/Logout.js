import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Logout = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({type: "LOGINOUT", payload: false});
        localStorage.removeItem("user");
        setTimeout(() => {
            navigate("/login");
        },10);
        toast.info('Logout Successful', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            <ToastContainer/>
    }, []);
    return null;
};
export default Logout;