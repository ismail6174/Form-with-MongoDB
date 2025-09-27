import { otp_verification_model } from "../model/otpVerifySchema.js";
import { userModel } from "../model/userSchema.js";

export const verify_otp_Controller = async (req, res) => {
  try {
    const { email, otpCode } = req.body;

    // 1. Check if user exists
    const find_user = await userModel.findOne({ email });
    if (!find_user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Check if OTP matches
    const find_otp_user = await otp_verification_model.findOne({
      user_id: find_user._id,
      otpCode,
    });

    if (!find_otp_user) {
      return res.status(403).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ OTP verified
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      user: {
        id: find_user._id,
        username: find_user.username,
        email: find_user.email,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
