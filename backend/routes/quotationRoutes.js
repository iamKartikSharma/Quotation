import express from "express";
import Quotation from "../models/Quotation.js";
import Counter from "../models/counter.js";

const router = express.Router();

// Function to get next sequence number for quotations
async function getNextQuotationNumber() {
  const counter = await Counter.findOneAndUpdate(
    { name: "quotationNumber" }, // name of the counter
    { $inc: { seq: 1 } },        // increment by 1
    { new: true, upsert: true }  // create if not exists
  );
  return counter.seq;
}

// Save a full quotation
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Get next quotation number
    const quotationNumber = await getNextQuotationNumber();

    // 2️⃣ Save quotation with auto-generated number
    const quotation = new Quotation({
      ...req.body,           // existing data from frontend
      quotationNumber,       // auto-incremented number
    });

    await quotation.save(); // keep your save logic intact

    res.status(201).json(quotation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Optional: Get all quotations
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().populate("customer");
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
