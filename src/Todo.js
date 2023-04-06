import React, { useState } from 'react'
import axios from "axios";
export default function Todo({item,token,config}) {
  const [inputUpdate,setInputUpdate] = useState(false)
  const [todo,setTodo] =useState()
  const[isDelete,setIsDelete] =useState(false)
  const updateTask = async (event) => {
    event.preventDefault();
    setInputUpdate(true)
    //setItputtrue
  }
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `https://backoffice.nodemy.vn/api/tasks/${id}`,
        config
      );
    //   setTodo(response.data.data);
    //   renderTodoList();
    } catch (error) {}
  };
  return (
    <>    {!isDelete?    <div className="d-flex table-task">
    {!inputUpdate?        <div className="col-8 d-flex justify-content-center align-items-center text-color">
      {item.attributes.title}
    </div> : <input value={item.attributes.title}></input>}

    <button
      className="col-2 btn btn-primary mx-1"
      style={{ borderRadius: "6px", paddingRight: "5px" }}
      onClick={updateTask}
    >
      Sửa
    </button>
    <button
      className="col-2 btn btn-danger mx-1"
      style={{ borderRadius: "6px" }}
      onClick={() => {
        deleteTodo(item.id);
      }}
    >
      Xóa
    </button>
  </div> : null}</>
  )
}
