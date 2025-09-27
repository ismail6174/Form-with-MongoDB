import express from "express";
import { signupController } from "../controller/signupController.js";
import { loginController } from "../controller/loginController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { getAllUsersController } from "../controller/getAllUserController.js";
import { verify_otp_Controller } from "../controller/verifyotpController.js";
import { getProfileController } from "../controller/getProfileController.js";



const router = express.Router();

router.post("/signup",signupController)
router.post("/login",loginController)
router.get("/allusers", tokenVerify, getAllUsersController);
router.post("/verify-otp", verify_otp_Controller);
router.get("/me", tokenVerify, getProfileController);



export default router;


