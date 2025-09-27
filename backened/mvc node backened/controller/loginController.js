
import { userModel } from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // 2. Find user
    const getData = await userModel.findOne({ email });
    if (!getData) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Compare password
    const comparePassword = await bcrypt.compare(password, getData.password);
    if (!comparePassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate JWT with user ID
    const token = jwt.sign(
      { id: getData._id }, // ✅ store user id in payload
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 5. Success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: getData._id,
        name: getData.username, 
        email: getData.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

