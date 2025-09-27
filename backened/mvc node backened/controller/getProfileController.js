// controller/getProfileController.js
import { userModel } from "../model/userSchema.js";

export const getProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
