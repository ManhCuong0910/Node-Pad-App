import { call, delay, put, takeLatest } from "redux-saga/effects";
import { toDoListService } from "../../services/ToDoListSevices";
import {
  DISPLAY_LOADING,
  GET_TASK_API,
  GET_TASK_API_PAGINATION,
  HIDE_LOADING
} from "../constants/TodoListConstants";

function* getTaskApi() {

  yield put ({
    type: DISPLAY_LOADING
  })

  yield delay(300)
  let { data } = yield call(toDoListService.getTaskApi);
  yield put({
    type: GET_TASK_API,
    taskList: data.data,
    totalPage: data.meta.pagination.total,
  });

  yield put ({
    type: HIDE_LOADING
  })
}
export function* actionGetApi() {
  yield takeLatest("getTaskApiSaga", getTaskApi);
}


function* getTaskListApiPaginationSaga(page) {
  yield put ({
    type: DISPLAY_LOADING
  })
  yield delay(300)

  let { data } = yield call(() => {
    return toDoListService.getTaskListApiPaginationSaga(page.event);
  });
  
  yield put({
    type: GET_TASK_API_PAGINATION,
    taskList: data.data,
    totalPage: data.meta.pagination.total,
  });

  yield put ({
    type: HIDE_LOADING
  })
  
  function * delTaskApi() {
  
  }
  
  export function* trackActionDelApi() {
    yield takeLatest("delTask", delTaskApi);
  }
}
export function* actionGetApiPagination() {
  yield takeLatest("getTaskApiPaginationSaga", getTaskListApiPaginationSaga);
}