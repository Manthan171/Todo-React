import React, {useState} from "react";
import {useNavigate  } from "react-router";
// import { getUser } from "../todo/getLocalItems";
import './login.css'


const Login = (props) => {
    const [input, setInput] = useState("");
    // const [user, setUser] = useState(getUser());
    let navigate = useNavigate();
    console.log("Props:",props);
    const addUser = () => {
        // setUser([input]);
        localStorage.setItem('login', JSON.stringify([input]));
        
        navigate("/home");
    }
    return(
        <>
        <div className="loginMain"> 
            <h1>LogIn</h1>
            <h2>Name</h2>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Enter your user name" />
            <h2>Password</h2>
            <input type="password" placeholder="enter password" />
            <button type="submit" onClick={() => addUser()}>Login</button>
            {/* <NavLink to="/home">
            </NavLink> */}
        </div>
        </>
    )

}

export default Login ;