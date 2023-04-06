import {
  EDIT_TASK,
  GET_TASK_API,
  GET_TASK_API_PAGINATION,
} from "../constants/TodoListConstants";

const initialState = {
  taskList: [],
  totalPage: [],
};

export const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_API:
      state.taskList = action.taskList;
      state.totalPage = action.totalPage;
      return { ...state };
    case GET_TASK_API_PAGINATION:
      state.taskList = action.taskList;
      state.totalPage = action.totalPage;
      return { ...state };
    case EDIT_TASK:
      console.log(action)
      const taskIndex = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
        state.taskList[taskIndex] = action.payload;
      return { ...state };
    default:
      return state;
  }
};
