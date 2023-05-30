import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ToDoList from "./Todolist/Todolist";
import Submit from "./components/submit";
import ChartTask from "./Todolist/Chart";
import RegisterForm from "./components/RegisterForm";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Submit></Submit>}></Route>
          <Route path="/todoapp" element={<ToDoList></ToDoList>}></Route>
          <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>
          <Route path="/todoapp/chart" element={<ChartTask />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
