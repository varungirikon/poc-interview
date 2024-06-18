import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../style.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login.jsx";
import LoginForm from "./components/loginForm/Login";
import PhotoVarification from "./pages/photo.verification";
import CodingTest from "./pages/coding.test";
import BrowserRecorder from "./pages/BrowserRecorder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path:"/interview",
    element: <BrowserRecorder/>
  },
  {
    path: "/login/",
    element: <Login />,
  },
  {
    path: "/verification/",
    element: <PhotoVarification />,
  },
  {
    path: "/test/",
    element: <CodingTest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" w-full bg-gradient-to-r from-blue-500 to-purple-600 flex min-h-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
