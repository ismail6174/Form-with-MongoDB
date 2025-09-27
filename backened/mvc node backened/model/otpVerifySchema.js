import mongoose from "mongoose";

const otp_verification_schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, //user id type which is saved in db 
      required: true,
      ref: "user", //refernce matching from db collection user with otpcodes
    },
    otpCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const otp_verification_model = mongoose.model(
  "otp-codes",
  otp_verification_schema
);

// data association