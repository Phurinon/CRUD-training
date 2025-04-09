import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import FormUser from "./components/FormUser";
import FormEditUser from "./components/FormEditUser";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Info from "./pages/Info";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      {/* <div className="text-4xl font-bold">
        <Link to={"/"} className="px-2">
          Home
        </Link>
        <Link to={"/register"} className="px-2">
          Register
        </Link>
        <Link to={"/login"} className="px-2">
          Login
        </Link>
        <Link to={"/form"} className="px-2">
          Form
        </Link>
        <Link to={"/info"} className="px-2">
          Info
        </Link>
      </div> */}
      <Navbar />

      <Routes>
        <Route path="/edit/:id" element={<FormEditUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form/:id" element={<FormUser />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
