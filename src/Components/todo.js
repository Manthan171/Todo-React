import React, { useEffect, useState } from "react";
import getItems from "./getLocalItems";
import './todo.css';

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getItems());
    const [editState , setEditState] = useState({isEdit:false , index:-1})

    //Add items to the list
    const addItem = () => {
        if(!inputData){
           alert('Enter a task first...');
        }else{
            if(editState.isEdit) {
                console.log("Edit state", editState.isEdit);
                const currentToDOData = [...items]
                currentToDOData[editState.index] = inputData;
                setItems(currentToDOData);
                setEditState({
                    ...editState,
                    isEdit:false,
                    index:-1
                })

            } else {
                setItems([...items ,inputData]);
            }
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
        setItems(updateItems);
    }

    // Edit items
    const editItems = (id) => {
        setEditState({
            ...editState,
            isEdit:true,
            index:id
        })
        setInputData(items[id]);
        // // setItems(inputData[id].replace(inputData));
        // console.log(inputData);
        // console.log(id);
    }

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(items));
        console.log("first")
    }, [items]);

    return(
        <>
            <div className="main-div">
                <h1 className="greetingMsg">Hey amigo <i className="fa fa-smile-o" aria-hidden="true"></i></h1>
                <div className="child-div">
                    <div className="heading">
                        <h2>Add your today's tasks here</h2>
                    </div>
                    <div className="addItems">
                        <input type="text" placeholder="Please enter a task..." value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        <i className="fa fa-list" aria-hidden="true"></i>
                        <button onClick={() => {addItem();}}>Add task</button>
                    </div>
                    <div className="showItems">
                        {
                            items.map((element, index) => {
                                return(
                                    <div className="eachItems" key={index}>
                                        <h3>{element} </h3>
                                        <div>
                                            <button onClick={() => deleteItems(index)}>Delete</button>
                                            <button onClick={() => editItems(index)}>Edit</button>
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