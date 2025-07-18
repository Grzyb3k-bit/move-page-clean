import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/login.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Singup from "./pages/Signup.jsx";
import AccontInfo from "./pages/account.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "login", element: <Login /> },
  { path: "singup", element: <Singup /> },
  { path: "account", element: <AccontInfo /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<AccountInfo />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
