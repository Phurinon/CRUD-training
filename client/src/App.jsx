import React from "react";
import FormUser from "./components/FormUser";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import FormEditUser from "./components/FormEditUser";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="text-4xl font-bold">Form CRUD</div>
        <Routes>
          <Route path="/" element={<FormUser />} />
          <Route path="/edit/:id" element={<FormEditUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
