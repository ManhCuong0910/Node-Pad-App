import React, { useEffect } from "react";
import ToDoList from "./Todolist/Todolist";
import Submit from "./components/submit";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import LoadingComponent from "./components/LoadingComponent/loadingComponent";
import { render } from "@testing-library/react";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Submit></Submit>}></Route>
          <Route exact path="/todoapp" element={<ToDoList></ToDoList>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
