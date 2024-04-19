import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import app from "./firebase.ts";
import Router from "./router/router.tsx";
import { AuthContext, UserContext } from "./context/AuthContext.tsx";
const currentAuth = "PH";
const currentUser = "PH";
console.log("app", app);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContext.Provider value={currentAuth}>
      <UserContext.Provider value={currentUser}>
        <Router>
          <App />
        </Router>
      </UserContext.Provider>
    </AuthContext.Provider>
  </React.StrictMode>
);
