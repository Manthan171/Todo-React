import React from "react"
import {useNavigate  } from "react-router";

const View = () => {
    let viewValue = JSON.parse(localStorage.getItem('view'));
    console.log(viewValue);
    let navigate = useNavigate();
    const clearLocal = () => {
        localStorage.removeItem('login');
        navigate("/");
    }
    return(
        <>
            <h2>{viewValue}</h2>
            <button onClick={() => clearLocal()}>Logout</button>
            <button onClick={() => navigate("/home")}>Go back</button>
        </>
    )
}

export default View;