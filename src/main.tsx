import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import { AuthProvider } from "./lib/hooks/useAuth";
import { ThemeProvider } from "./lib/hooks/useTheme.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<ThemeProvider
				defaultTheme="dark"
				storageKey="vite-ui-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</AuthProvider>
	</React.StrictMode>
);
