// Line 1
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/globals.css"; // adjust if needed

// Line 6
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
