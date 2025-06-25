const express = require("express");
const router = express.Router();
const Leave = require("../Models/LeaveModel");
const authHR = require("../Auth/authHR");


// Apply for leave
router.post("/apply", async (req, res) => {
  const { employeeId, leaveType, fromDate, toDate, reason } = req.body;

  try {
    const newLeave = new Leave({
      employee: employeeId,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave application submitted", leave: newLeave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all leaves (admin/HR)
router.get("/get-leaves", authHR,async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "name email");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update leave status (approve/reject)
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Leave status updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports =router;