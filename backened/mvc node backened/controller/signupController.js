import { userModel } from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { send_verification_email } from "../services/nodemailer_service.js";
import { otp_verification_model } from "../model/otpVerifySchema.js";

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // 2. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3. Hash password
    const encryptPassword = await bcrypt.hash(password, 10);

    // 4. Create user object
    const userObj = {
      username,
      email,
      password: encryptPassword,
    };

    // 5. Save user in DB
    const saveData = await userModel.create(userObj);

    // 6. Generate JWT
    const token = jwt.sign(
      { username, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 7. Generate OTP
    const generate_code = Math.floor(100000 + Math.random() * 900000);

    // Save OTP in DB
    await otp_verification_model.create({
      user_id: saveData._id,
      otpCode: generate_code,
    });

    // 8. Send OTP email
    try {
      await send_verification_email(email, generate_code);
    } catch (err) {
      console.error("Email sending failed:", err);
      return res.status(500).json({
        success: false,
        message: "User created but failed to send verification email",
      });
    }

    // 9. Success response
    res.status(201).json({
      success: true,
      message: "User created successfully. Verification email sent.",
      userId: saveData._id,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
