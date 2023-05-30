import {
  ADD_TASK,
  EDIT_CHECKED,
  EDIT_TASK,
  GET_ALL_TASK_LIST,
  GET_TASK_API,
  GET_TASK_API_PAGINATION,
} from "../constants/TodoListConstants";

const initialState = {
  taskList: [],
  totalPage: [],
  page: [],
};

export const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK_LIST:
      state.taskList = action.taskList;
      state.totalPage = action.totalPage;
      return { ...state };
    case GET_TASK_API:
      state.taskList = action.taskList;
      state.totalPage = action.totalPage;
      state.page = action.page;
      return { ...state };
    case GET_TASK_API_PAGINATION:
      state.taskList = action.taskList;
      state.totalPage = action.totalPage;
      return { ...state };
    case EDIT_TASK:
      const taskIndex = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskList[taskIndex] = action.payload;
      return { ...state };
    case ADD_TASK:
      state.taskList = action.taskList;
      state.totalPage = action.totalPage;
      return { ...state };
    case EDIT_CHECKED:
      console.log(action);
      const checkIndex = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskList[checkIndex].attributes.complete = action.payload;
      return { ...state };
    default:
      return state;
  }
};
