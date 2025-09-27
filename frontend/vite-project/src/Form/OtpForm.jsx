import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URI } from "../utils/uri";
import Swal from "sweetalert2"; // SweetAlert2
import { ToastContainer, toast } from "react-toastify"; // Toastify
import "react-toastify/dist/ReactToastify.css";

const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // ✅ Get email from navigation state

  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URI}api/verify-otp`, {
        email,
        otpCode,
      });

      if (res.data.success) {
        Swal.fire({
          title: "Success 🎉",
          text: "OTP verified successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/login");
        });

        toast.success("OTP verified successfully!");
      } else {
        Swal.fire({
          title: "Invalid OTP",
          text: res.data.message || "Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });

        toast.error(res.data.message || "Invalid OTP!");
      }
    } catch (err) {
      console.error("OTP verification error:", err);

      Swal.fire({
        title: "Error",
        text: "OTP verification failed. Try again later.",
        icon: "error",
      });

      toast.error("OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await axios.post(`${BASE_URI}api/resend-otp`, { email });

      Swal.fire({
        title: "OTP Resent 📩",
        text: res.data.message || "OTP resent successfully!",
        icon: "info",
      });

      toast.info(res.data.message || "OTP resent!");
    } catch (err) {
      console.error("Resend OTP error:", err);

      Swal.fire({
        title: "Error",
        text: "Failed to resend OTP.",
        icon: "error",
      });

      toast.error("Failed to resend OTP!");
    } finally {
      setResending(false);
    }
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
      <Paper elevation={4} sx={{ p: 4, width: 350, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="600">
          Verify OTP
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
          Enter the OTP sent to <b>{email}</b>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="OTP"
            type="text"
            name="otpCode"
            fullWidth
            margin="normal"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
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
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Verify OTP"}
          </Button>
        </form>

        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
          Didn’t receive OTP?{" "}
          <Link sx={{ cursor: "pointer", fontWeight: "500" }} onClick={handleResend}>
            {resending ? "Resending..." : "Resend"}
          </Link>
        </Typography>
      </Paper>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default OTPForm;
