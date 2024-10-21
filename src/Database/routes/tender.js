const express = require("express");
const Tender = require("../models/tender");
const router = express.Router();

// GET all tenders with optional filtering and pagination
router.get("/", async (req, res) => {
  const { state, district, department, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (state) filters.state = state;
  if (district) filters.district = district;
  if (department) filters.org_name = department;

  try {
    const tenders = await Tender.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Tender.countDocuments(filters);

    res.json({
      tenders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenders" });
  }
});

// GET a specific tender by ID
router.get("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }
    res.json({ tender });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tender" });
  }
});

module.exports = router;
