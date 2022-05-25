import React, {useState} from "react"
import {useNavigate  } from "react-router";

const View = () => {
    let viewObject = JSON.parse(localStorage.getItem('view'));
    const [inputData, setInputData] = useState('');
    const [editMode, setEditMode] = useState({isEdit: false})
    let viewValue = viewObject.currentData;
    console.log(viewValue);
    let navigate = useNavigate();
    const clearLocal = () => {
        localStorage.removeItem('login');
        navigate("/");
    }

    const getEditData = () => {
        setInputData(viewValue);
        setEditMode({isEdit: true})
    }

    const edit = () => {
        let name = JSON.parse(localStorage.getItem('login'));
        let localMain = JSON.parse(localStorage.getItem(name[0]));
        localMain[viewObject.index] =  inputData;
        localStorage.setItem(name[0], JSON.stringify(localMain));
        localStorage.setItem('view', JSON.stringify({currentData : inputData ,index:viewObject.index}));
        setEditMode({isEdit: true})
    }

    return(
        <>
            <h2>{viewValue}</h2>
            <button onClick={() => clearLocal()}>Logout</button>
            <button onClick={() => navigate("/home")}>Go back</button>
            <button onClick={() => getEditData()}>Edit</button>
            <div>
                <input type = "text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
                <button onClick={() => edit()}>Edit data</button>
            </div>
        </>
    )
}

export default View;