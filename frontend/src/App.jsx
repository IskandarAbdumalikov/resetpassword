import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Auth from "./pages/auth/Auth";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
