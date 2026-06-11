import { createBrowserRouter } from "react-router";
import { createElement } from "react";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: createElement("h1", null, "Home Page"),
    },
    {
        path: "/login",
        element: createElement(Login),
    },
    {
        path: "/register",
        element: createElement(Register),
    },
]);