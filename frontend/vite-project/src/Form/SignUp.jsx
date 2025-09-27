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
import { BASE_URI } from "../utils/uri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2
import { ToastContainer, toast } from "react-toastify"; // Toastify
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
const navigate = useNavigate();

const [formData, setFormData] = useState({
username: "",
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

const handleSubmit = (e) => {
e.preventDefault();
setLoading(true);


axios
  .post(`${BASE_URI}api/signup`, formData)
  .then((res) => {
    if (res.data.success || res.data.success === true) {
      // ✅ Save only token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      Swal.fire({
        title: "Success 🎉",
        text: "Signup successful! Verify your OTP next.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      });

      toast.success("Signup successful!");
    } else {
      Swal.fire({
        title: "Signup Failed",
        text: res.data.message || "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#d33",
      });

      toast.error(res.data.message || "Signup failed, try again!");
    }
  })
  .catch((err) => {
    console.error(err);

    Swal.fire({
      title: "Error",
      text: "Signup request failed",
      icon: "error",
    });

    toast.error("Signup request failed");
  })
  .finally(() => {
    setLoading(false);
  });


};

return (
<Box
display="flex"
justifyContent="center"
alignItems="center"
minHeight="100vh"
sx={{
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
p: 2,
}}
>
<Paper
elevation={4}
sx={{
p: 4,
width: 380,
borderRadius: 3,
backgroundColor: "rgba(255, 255, 255, 0.95)",
}}
>
{/* Header */} 
<Typography variant="h5" align="center" gutterBottom fontWeight="600">
Create an Account </Typography> <Typography
       variant="body2"
       align="center"
       color="text.secondary"
       gutterBottom
     >
Join us today and get started 🚀 </Typography>


    {/* Form */}
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        value={formData.username}
        onChange={handleChange}
        required
      />
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
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          color: "#fff",
          "&:disabled": {
            background: "linear-gradient(45deg, #999, #bbb)",
          },
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign Up"}
      </Button>
    </form>

    {/* Divider */}
    <Divider sx={{ my: 3 }}>or</Divider>

    {/* Already have account */}
    <Typography align="center" variant="body2">
      Already have an account?{" "}
      <Link
        onClick={() => navigate("/login")}
        sx={{ cursor: "pointer", fontWeight: "500" }}
      >
        Log In
      </Link>
    </Typography>

    {/* Footer Note */}
    <Typography
      variant="caption"
      align="center"
      display="block"
      sx={{ mt: 3, color: "text.secondary" }}
    >
      By signing up, you agree to our{" "}
      <Link href="#" underline="hover">
        Terms of Service
      </Link>{" "}
      &{" "}
      <Link href="#" underline="hover">
        Privacy Policy
      </Link>
      .
    </Typography>
  </Paper>

  {/* Toastify Container */}
  <ToastContainer position="top-right" autoClose={3000} />
</Box>


);
};

export default SignupForm;
