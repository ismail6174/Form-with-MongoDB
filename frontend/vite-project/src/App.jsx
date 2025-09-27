import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./Form/SignUp";
import LoginForm from "./Form/Login";
import OTPForm from "./Form/OtpForm";
import Dashboard from "./Components/Dashboard";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/verify-otp" element={<OTPForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
    </Routes>
  );
};

export default App;
