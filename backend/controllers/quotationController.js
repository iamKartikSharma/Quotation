import express from "express";
import Quotation from "../models/Quotation.js";

const router = express.Router();

// Save a full quotation
router.post("/", async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all quotations (optional)
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().populate("customer");
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
