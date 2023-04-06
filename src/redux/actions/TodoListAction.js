import axios from "axios";
import { EDIT_TASK, GET_TASK_API, GET_TASK_API_PAGINATION } from "../constants/TodoListConstants";
const Swal = require('sweetalert2')
export const getTaskListApi = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios.get(
        "https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=4"
      );
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data.data,
          totalPage : data.meta.pagination.total
        });
      }
    } catch (error) {
      console.log("Call API thất bại rồi");
    }
  };
};

export const getTaskListApiPagination = (page) => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios.get(
        `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${page}&pagination[pageSize]=4`
      );
      if (status === 200) {
        dispatch({
          type: GET_TASK_API_PAGINATION,
          taskList: data.data,
          totalPage : data.meta.pagination.total
        });
      }
    } catch (error) {
      console.log("Call API thất bại rồi");
    }
  };
};

export const addTaskApi = (inputValue, config,file) => {

  return (dispatch) => {
    if (inputValue.current.value.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Nội dung không được để trống',
        text: 'Hãy nhập công việc của bạn',
      })
    } else {
      const dataguidi = {
        data: {
          title: inputValue.current.value,
        },
      };
      const response = axios.post(
        "https://backoffice.nodemy.vn/api/tasks",
        dataguidi,
        config
      );
      response.then((res) => {
        console.log(res.data.data.id)
        const formdata = new FormData();
        formdata.append("files", file);
            formdata.append("ref", "api::task.task");
            formdata.append("refId", res.data.data.id);
            formdata.append("field", "image");
        axios.post("https://backoffice.nodemy.vn/api/upload", formdata)
        dispatch(getTaskListApi());
      });
    }
  };
};

export const delTaskApi = (id, config) => {
  return (dispatch) => {
    const result = axios.delete(
      `https://backoffice.nodemy.vn/api/tasks/${id}`,
      config
    );
    result.then((res) => {
      dispatch(getTaskListApi());
    });
  };
};


export const editTask = (id, title, config) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`https://backoffice.nodemy.vn/api/tasks/${id}`, {data:{title:title}}, config);
      dispatch({
        type: EDIT_TASK,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
