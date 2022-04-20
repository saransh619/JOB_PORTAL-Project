import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
const Logout = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({type: "LOGINOUT", payload: false});
        localStorage.removeItem("user");
        navigate("/login");
    }, []);
    return null;
};
export default Logout;