import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
export function* rootSaga() {
  // Theo dõi các action saga trên todo
  yield all([
    ToDoListSaga.actionGetApi(),
    ToDoListSaga.actionGetApiPagination(),
  ]);
}
