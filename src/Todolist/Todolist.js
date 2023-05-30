import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox, Pagination } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSearch from "../HOC/ListSearch";
import PieChartIcon from "@mui/icons-material/PieChart";
import {} from "../assets/IMG_Loading/loading-fast.gif";
import AbcIcon from "@mui/icons-material/Abc";
import {
  addTaskApi,
  delTaskApi,
  editCheck,
  editTask,
  getTaskListApi,
  getTaskListApiPagination,
} from "../redux/actions/TodoListAction";
import ChartTask from "./Chart";
import ExportExcels from "./ExportExcels";
import "./ToDoList.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import React from "react";
import i18next from "i18next";
import { clear } from "@testing-library/user-event/dist/clear";

function ToDoList() {
  const { t, i18n } = useTranslation();
  const { taskList, totalPage, page } = useSelector(
    (state) => state.TodoListReducer
  );
console.log(36,page)
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const inputEditValue = useRef();
  const [pageSize, setPageSize] = useState(1);
  const dispatch = useDispatch();
  const inputValue = useRef();
  const checkBox = useRef();
  const [totalComplete, setTotalComplete] = useState([]);
  const [notification, setNotification] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState(true);
  const navigate = useNavigate();
  const [addImage, setAddImage] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("vi");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjgwMTY0Mzc2LCJleHAiOjE2ODI3NTYzNzZ9.0Dzqc0iS9aAhCeaIVwEfpL4G8oaqkKnazpqeVE8tefk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getTaskList = (page) => {
    page = pageSize;
    dispatch(getTaskListApi(page));
  };
  useEffect(() => {
    getTaskList();
  }, []);

  const deleteTodo = (id) => {
    let task = taskList.length;
    dispatch(delTaskApi(id, config, pageSize, task));
  };

  const addTask = (event) => {
    event.preventDefault();
    dispatch(addTaskApi(inputValue, config, file, pageSize));
    inputValue.current.value = "";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleChangePage = (event) => {
    setPageSize(event);
    dispatch(getTaskListApiPagination(event));
    dispatch(getTaskListApi(event));
  };
  const editTodo = (id) => {
    const newTitle = inputEditValue.current.value;
    dispatch(editTask(id, newTitle, config, pageSize));
    inputEditValue.current.value = "";
  };
  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };
  const changeLanguage = () => {
    const newLanguage = currentLanguage === "vi" ? "en" : "vi";
    console.log(currentLanguage);
    setCurrentLanguage(newLanguage);
    console.log(currentLanguage);

    i18n.changeLanguage(newLanguage);
  };
  const getCompleteTask = async () => {
    const res = await axios.get("https://backoffice.nodemy.vn/api/tasks");
    const total = res.data.data.filter((item) => {
      return item.attributes.complete === false;
    });
    setTotalComplete(total.length);
    setNotification(!notification);
  };
  const handleSearch = () => {
    setSearchDisplay(!searchDisplay);
  };

  const handleCheck = (e, id) => {
    console.log(e.target.checked);
    dispatch(editCheck(id, config, e.target.checked, pageSize));
  };

  
  const handleOpenChart = () => {
    navigate("./chart");
  };

  const renderTodoList = () => {
    return taskList.map((item) => {
      const image = item?.attributes?.image?.data?.attributes?.url;
      return (
        <div
          className="d-flex table-task justify-content-between"
          key={item.id}
        >
          <div className="d-flex justify-content-between">
            <Checkbox
              className="check-task me-3"
              onChange={(e) => {
                handleCheck(e, item.id);
              }}
              checked={item.attributes.complete}
            ></Checkbox>
            {image ? (
              <img
                style={{ width: 40, height: 40, borderRadius: "50%" }}
                src={`https://backoffice.nodemy.vn${image}`}
                alt=""
              ></img>
            ) : (
              <div>
                <CloseIcon style={{ width: 40, height: 40 }} />
              </div>
            )}
          </div>
          <div>
            {" "}
            <div className="d-flex justify-content-center align-items-center text-color">
              {item.attributes.title}
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary mx-1"
              style={{ borderRadius: "6px" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setEditId(item.id);
              }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger mx-1"
              style={{ borderRadius: "6px" }}
              onClick={() => {
                deleteTodo(item.id);
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      );
    });
  };
  const login = Cookies.get("login");
  const handleAddImage = () => {
    setAddImage(!addImage);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }} className="todo">
          <h2 className="text-center pt-4 display-3 animate__animated animate__backInLeft">
            {t("DANH SÁCH CÔNG VIỆC CỦA TÔI")}
          </h2>
          {searchDisplay ? (
            <div>
              <input
                name="taskName"
                className="mt-3"
                placeholder={t("Hãy nhập công việc của bạn")}
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
              {addImage ? (
                <div>
                  <input
                    type="file"
                    onChange={handleUploadFile}
                    style={{ marginTop: 30 }}
                  ></input>
                  <br></br>
                </div>
              ) : null}
              <button className="btn btn-success mt-3" onClick={addTask}>
                {t("Thêm công việc")}
              </button>{" "}
            </div>
          ) : (
            <ListSearch></ListSearch>
          )}
          <br></br>
          {renderTodoList()}
          <Pagination
            total={totalPage}
            pageSize={4}
            current={pageSize}
            className="Pagination"
            onChange={handleChangePage}
            style={{ textAlign: "center" }}
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
      <div className="notification">
        <NotificationsActiveIcon
          className="bell"
          style={{ fontSize: 40, color: "white" }}
          onClick={getCompleteTask}
        ></NotificationsActiveIcon>
        {notification ? (
          <span>Bạn còn {totalComplete} công việc chưa hoàn thành</span>
        ) : null}
      </div>
      <div className="search-Icon">
        <SearchIcon
          style={{ fontSize: 40 }}
          onClick={handleSearch}
        ></SearchIcon>{" "}
        <br></br>
        <p style={{ marginTop: 20 }}>
          <ExportExcels></ExportExcels>
        </p>
        <p>
          <AddPhotoAlternateIcon
            style={{ fontSize: 40 }}
            onClick={handleAddImage}
          ></AddPhotoAlternateIcon>
        </p>
        <p>
          <PieChartIcon
            style={{ fontSize: 40 }}
            onClick={handleOpenChart}
          ></PieChartIcon>
        </p>
        <p>
          <AbcIcon style={{ fontSize: 40 }} onClick={changeLanguage}></AbcIcon>
        </p>
      </div>
    </>
  );
}

export default ToDoList;
