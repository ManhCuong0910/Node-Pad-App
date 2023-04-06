import { Pagination } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from '../assets/IMG_Loading/loading-fast.gif'
import {
  addTaskApi,
  delTaskApi,
  editTask,
} from "../redux/actions/TodoListAction";
import "./ToDoList.css";
import Cookies from "js-cookie";
import LoadingComponent from "../components/LoadingComponent/loadingComponent";
function ToDoList() {
  const { taskList, totalPage } = useSelector((state) => state.TodoListReducer);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const inputValue = useRef();
  const [file,setFile] = useState(null)
  const inputEditValue = useRef();
  const [url,setUrl] = useState("")
  //axios.post(url,{identfier:âs,Password:pass}) => response.data.jwt = token
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjgwMTY0Mzc2LCJleHAiOjE2ODI3NTYzNzZ9.0Dzqc0iS9aAhCeaIVwEfpL4G8oaqkKnazpqeVE8tefk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getTaskList = () => {
    dispatch({
      type: "getTaskApiSaga",
    });
  };
  useEffect(() => {
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTodo = (id) => {
    dispatch(delTaskApi(id, config));
  };

  const addTask = (event) => {
    event.preventDefault();
    dispatch(addTaskApi(inputValue, config,file));
    inputValue.current.value = "";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleChangePage = (event) => {
    dispatch({
      type: "getTaskApiPaginationSaga",
      event,
    });
  };
  const editTodo = (id) => {
    const newTitle = inputEditValue.current.value;
    dispatch(editTask(id, newTitle, config));
  };
  const handleUploadFile = (e) =>{
    setFile(e.target.files[0])
    // const reader = new FileReader();
    // const url = reader.readAsDataURL(file);
  // setUrl(url)
  }
  console.log(url)
  const renderTodoList = () => {
    return taskList.map((item) => {
      const image = item?.attributes?.image?.data?.attributes?.url
      return (
        <div className="d-flex table-task" key={item.id}>
        {image ?<img style={{width:80, height:80, borderRadius:'50%'}}src={`https://backoffice.nodemy.vn${image}`} alt=""></img> : <img src='../assets/IMG_Loading/loading-fast.gif' style={{width:80, height:80, borderRadius:'50%'}} alt=""></img> }
        <div className="col-8 d-flex justify-content-center align-items-center text-color">
            {item.attributes.title}
          </div>
          <button
            className="col-2 btn btn-primary mx-1"
            style={{ borderRadius: "6px", paddingRight: "5px" }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setEditId(item.id);
            }}
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
        </div>
      );
    });
  };
  const login = Cookies.get("login");

  return (
    <>
      <LoadingComponent></LoadingComponent>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }} className="todo">
          <h2 className="text-center pt-4 display-3 animate__animated animate__backInLeft">
            MY TODO
          </h2>
          <input
            name="taskName"
            className="mt-3"
            placeholder="Hãy nhập công việc của bạn"
            style={{
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
              borderRadius: "6px",
              padding: "10px 0",
              display: "block",
              color: "grey",
            }}
            ref={inputValue}
          ></input>
          <input type="file" onChange={handleUploadFile} style={{marginTop:30}}></input>  <br></br>
          <button className="btn btn-success mt-3" onClick={addTask}>
            ADD_TASK
          </button>
          {renderTodoList()}
          <Pagination
            total={totalPage}
            pageSize={4}
            className="Pagination"
            onChange={handleChangePage}
          />
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Hãy nhập nội dung bạn muốn sửa
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <input style={{ width: "100%" }} ref={inputEditValue}></input>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    editTodo(editId);
                  }}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ToDoList;
