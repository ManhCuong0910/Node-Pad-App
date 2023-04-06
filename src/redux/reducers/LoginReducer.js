import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/TodoListConstants";

const initialState = {
  isLoading: true,
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case HIDE_LOADING:
      state.isLoading = false;
      return { ...state };
    default:
      return state;
  }
};
