import { userModel } from "../model/userSchema.js";

export const getAllUsersController = async (req, res) => {
  try {
    const getallUsers = await userModel.find();

    res.json({
      message: "all users get",
      getallUsers,
    });
  } catch (error) {
    console.log(error);
  }
};