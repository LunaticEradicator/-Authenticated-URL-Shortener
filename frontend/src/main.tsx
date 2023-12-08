import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Parent
import App from "./App.jsx";

// Screen [Outlet]
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";
import UrlShorter from "./screens/UrlShorter.tsx";

// react router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Login />} />
      <Route path="/urlShorter" element={<UrlShorter />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
