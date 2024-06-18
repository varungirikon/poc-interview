import reactLogo from "../javascript.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import LoginForm from "./components/loginForm/Login";

function App() {
  return (
    <div className=" w-full bg-gradient-to-r from-blue-500 to-purple-600 flex  min-h-screen">
   <LoginForm/>
   </div>
  );
}

export default App;
