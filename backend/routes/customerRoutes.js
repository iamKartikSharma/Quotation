import express from "express";
import { addCustomer, getCustomers } from "../controllers/customerController.js";

const router = express.Router();
router.post("/", addCustomer);
router.get("/", getCustomers);

export default router;
