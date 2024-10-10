import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {App} from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { UserDetails } from "./Components/UserDetails.jsx";
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user/:id",
    element: <UserDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
