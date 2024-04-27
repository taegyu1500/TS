import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import app from "./firebase.ts";
import Router from "./router/router.tsx";

console.log("app", app);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
