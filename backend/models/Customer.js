import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    gstNumber: String,
    building: String,
    floor: String,
    nearestLandmark: String,
    address: String,
    mobileNumber: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
