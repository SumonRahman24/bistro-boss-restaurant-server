import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider> */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
