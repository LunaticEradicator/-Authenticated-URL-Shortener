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

// redux
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
// react router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<UrlShorter />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
