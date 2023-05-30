import axios from "axios";
import {
  EDIT_CHECKED,
  EDIT_TASK,
  GET_ALL_TASK_LIST,
  GET_TASK_API,
  GET_TASK_API_PAGINATION,
} from "../constants/TodoListConstants";
const Swal = require("sweetalert2");
export const getTaskListApi = (page) => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios.get(
        `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${page}&pagination[pageSize]=4&populate=*`
      );
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data.data,
          totalPage: data.meta.pagination.total,
          page:page
        });
      }
    } catch (error) {
      console.log("Call API thất bại rồi");
    }
  };
};
export const getAllTaskListApi =() => {
  return async (dispatch) => {
try {
  let{data} = await axios.get('https://backoffice.nodemy.vn/api/tasks')
  dispatch({
    type:GET_ALL_TASK_LIST,
    taskList:data.data
  })
} catch (error) {
  console.log("Call API thất bại")
}     
  }
}
export const getTaskListApiPagination = (page) => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios.get(
        `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${page}&pagination[pageSize]=4&populate=*`
      );
      if (status === 200) {
        dispatch({
          type: GET_TASK_API_PAGINATION,
          taskList: data.data,
          totalPage: data.meta.pagination.total,
        });
      }
    } catch (error) {
      console.log("Call API thất bại rồi");
    }
  };
};

export const addTaskApi = (inputValue, config, file, page) => {
  return (dispatch) => {
    if (inputValue.current.value.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Nội dung không được để trống",
        text: "Hãy nhập công việc của bạn",
      });
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
        dispatch(getTaskListApi(page));
        const formdata = new FormData();
        formdata.append("files", file);
        formdata.append("ref", "api::task.task");
        formdata.append("refId", res.data.data.id);
        formdata.append("field", "image");
        axios
          .post("https://backoffice.nodemy.vn/api/upload", formdata)
          .then((res) => {
            dispatch(getTaskListApi(page));
          })
          .catch((err) => {
            console.log("Task này không thêm ảnh");
          });
      });
    }
  };
};

export const delTaskApi = (id, config, page, taskList) => {
  return (dispatch) => {
    const result = axios.delete(
      `https://backoffice.nodemy.vn/api/tasks/${id}`,
      config
    );
    result.then((res) => {
      if (taskList === 1) {
        dispatch(getTaskListApi(page - 1));
      } else {
        dispatch(getTaskListApi(page));
      }
    });
  };
};

export const editTask = (id, title, config, page) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `https://backoffice.nodemy.vn/api/tasks/${id}`,
        { data: { title: title } },
        config
      );
      dispatch({
        type: EDIT_TASK,
        payload: response.data.data,
      });
      dispatch(getTaskListApi(page));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editCheck = (id, config, checkdata,page) => {
  console.log(checkdata)
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `https://backoffice.nodemy.vn/api/tasks/${id}`,
        { data: { complete: checkdata } },
        config
      );
      dispatch(getTaskListApi(page));
    } catch (err) {
      console.log("Đã sửa thất bại rồi");
    }
  };
};
