import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Singer from "./Singer.tsx";
import { LyricsProvider } from "./LyricsContext.tsx";

const router = createBrowserRouter([
	{
		path: "/singer",
		element: <App />,
		children: [
			{
				path: ":singer",
				element: <Singer />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<LyricsProvider>
			<RouterProvider router={router} />
		</LyricsProvider>
	</React.StrictMode>
);
