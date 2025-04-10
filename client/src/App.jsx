import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import FormUser from "./components/FormUser";
import FormEditUser from "./components/FormEditUser";
import Register from "./pages/auth/register";
import Login from "./pages/auth/Login";
import Info from "./pages/Info";
import Navbar from "./components/Navbar";
import NewNavbar from "./components/NewNavbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <NewNavbar />

      <Routes>
        <Route path="/edit/:id" element={<FormEditUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form/:id" element={<FormUser />} />
        <Route path="/info" element={<Info />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
