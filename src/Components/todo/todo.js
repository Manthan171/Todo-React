import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import {useNavigate  } from "react-router";
import getItems from "./getLocalItems";
import './todo.css';

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getItems());
    const [editState , setEditState] = useState({isEdit:false , index:-1});
    // const [viewState , setViewState] = useState({});
    const [warning, setWarning] = useState(false);
    const [toggle, setToggle] = useState({isToggle: false, text: ""});
    let name = JSON.parse(localStorage.getItem('login')); 
    let navigate = useNavigate();
    console.log(name)

    //Add items to the list
    const addItem = () => {
        if(!inputData){
           setWarning(true);
        }else{
            if(editState.isEdit) {
                console.log("Edit state", editState.isEdit);
                const currentToDOData = [...items];
                currentToDOData[editState.index] = inputData;
                setItems(currentToDOData);
                setToggle({isToggle: true, text: "Task Edited"})
                setTimeout(() => {
                    setToggle({isToggle: false, text: ""})
                }, 1000);
                setEditState({
                    ...editState,
                    isEdit:false,
                    index:-1
                }) 

            } else {
                setToggle({isToggle: true, text: "Task added"});
                setTimeout(() => {
                    setToggle({isToggle: false, text: ""})
                }, 1000);
                setItems([...items ,inputData]);
            }
           setWarning(false);
            setInputData('');
        }
    }

    // Delete items
    const deleteItems = (id) => {
        console.log(id);
        const updateItems = items.filter((element, index) => {
            return index !== id;
        })
        console.log(updateItems, "Updated items");
        setToggle({isToggle: true, text: "Task deleted"})
        setTimeout(() => {
            setToggle({isToggle: false, text: ""})
        }, 1000);
        setItems(updateItems);
    }

    // Edit items
    const editItems = (id) => {
        setEditState({
            ...editState,
            isEdit:true,
            index:id,
        })
        setInputData(items[id]);
    }

    const viewData = (id) => {
        const maindata = [...items];
        const viewdata = maindata[id];
        localStorage.setItem('view', JSON.stringify(viewdata));
        navigate("/view");
    } 

    //Clear login cred form local storage

    const clearLocal = () => {
        localStorage.removeItem('login');
        navigate("/");
    }

    useEffect(() => {
        localStorage.setItem(name[0], JSON.stringify(items));
    }, [items]);

    return(
        <>
            {
                toggle ? <h2 className="toggle">{toggle.text}</h2> : null
            }
            {
                warning ? <div className="warning">
                <h2>Please Enter the task first</h2>
                <button className="warningBtn" onClick={() => setWarning(false)}>Okay</button>
                </div>: null
            }
            
            <div className="main-div">
            <div className="logoutMain">
                <h1 className="greetingMsg">Hey {name} <i className="fa fa-smile-o" aria-hidden="true"></i></h1>
                <div className="logoutBtn">
                    <button onClick={() => clearLocal()}>Logout </button>
                </div>
            </div>
                <div className="child-div">
                    <div className="heading">
                        <h2>Add your today's tasks here</h2>
                    </div>
                    <div className="addItems">
                        <input type="text" placeholder="Please enter a task..." value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {/* <i className="fa fa-list" aria-hidden="true"></i> */}
                        <input type="button" className="submitBtn" onClick={() => {addItem();}} value={editState.isEdit ? "Edit task" : "Add task"} />
                    </div>
                    <div className="showItems">
                        {
                            items.map((element, index) => {
                                return(
                                    <div className="eachItems" key={index}>
                                        <h3>{element} </h3>
                                        <div>
                                            <button className="btnEvents" onClick={() => deleteItems(index)}>Delete</button>
                                            <button className="btnEvents" onClick={() => editItems(index)}>Edit</button>
                                            <button className="btnEvents" onClick={() => viewData(index)}>View</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;