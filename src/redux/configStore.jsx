import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import reduxThunk from 'redux-thunk'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from "./sagas/rootSaga";
import {TodoListReducer} from './reducers/TodoListReducers'
import {LoginReducer} from './reducers/LoginReducer'
const middleWareSaga = createMiddleWareSaga()
const rootReducer = combineReducers({
  TodoListReducer,
  LoginReducer
});
const store = createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

 middleWareSaga.run(rootSaga)
 
export default store