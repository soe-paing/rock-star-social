import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import ThemedApp from "./ThemedApp.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ThemedApp/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: "/",
				element: <App/>
			},
			{
				path: "/login",
				element: <Login/>
			},
			{
				path: "/Register",
				element: <Register/>
			},
			{
				path: "/Profile/:id",
				element: <Profile/>
			},
		]
	}
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);
