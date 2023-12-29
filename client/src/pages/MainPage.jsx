import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Main = () => {

    const {user, logoutUser} = useContext(AuthContext)
    

    return (
        <>
            <h1>Welcome to the MAIN PAGE {user?.fullName} </h1>
            <Link onClick={() => logoutUser()} to={'/'}> Logout</Link>
        </>
    )


};

export default Main;