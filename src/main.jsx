import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import '../style.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login.jsx";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
