import React, { useState } from "react";
import {
TextField,
Button,
Paper,
Typography,
Box,
Link,
Divider,
CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URI } from "../utils/uri";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);


try {
  const res = await axios.post(`${BASE_URI}api/login`, formData);

  if (res.data.success) {
    // ✅ Store JWT token
    localStorage.setItem("token", res.data.token);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back!",
      timer: 2000,
      showConfirmButton: false,
    });

    toast.success("✅ Logged in successfully!");

    setTimeout(() => navigate("/dashboard"), 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: res.data.message || "Invalid email or password",
    });
    toast.error("❌ Invalid email or password");
  }
} catch (err) {
  console.error("Login error:", err);
  Swal.fire({
    icon: "error",
    title: "Request Failed",
    text: "Please try again later.",
  });
  toast.error("❌ Login request failed");
} finally {
  setLoading(false);
}


};

return (
<Box
display="flex"
justifyContent="center"
alignItems="center"
minHeight="100vh"
sx={{
background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
p: 2,
}}
>
{/* Toastify */} <ToastContainer position="top-right" autoClose={3000} />


  <Paper
    elevation={6}
    sx={{
      p: 4,
      width: 380,
      borderRadius: 3,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    }}
  >
    {/* Header */}
    <Typography variant="h5" align="center" gutterBottom fontWeight="600">
      Welcome Back
    </Typography>
    <Typography
      variant="body2"
      align="center"
      color="text.secondary"
      gutterBottom
    >
      Please login to continue 👋
    </Typography>

    {/* Form */}
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email Address"
        type="email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          mt: 3,
          py: 1.2,
          borderRadius: 2,
          fontWeight: "600",
          background: "linear-gradient(45deg, #6a11cb, #2575fc)",
          color: "#fff",
          "&:disabled": {
            background: "linear-gradient(45deg, #999, #bbb)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          "Log In"
        )}
      </Button>
    </form>

    {/* Divider */}
    <Divider sx={{ my: 3 }}>or</Divider>

    {/* No account yet */}
    <Typography align="center" variant="body2">
      Don’t have an account?{" "}
      <Link
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer", fontWeight: "500" }}
      >
        Sign Up
      </Link>
    </Typography>
  </Paper>
</Box>


);
};

export default LoginForm;
