const express = require("express");
const AttendanceModel = require("../Models/AttendanceModel");
const RegularizationModel = require("../Models/RegularizationModel");
const EmployeeModel = require("../Models/EmployeeModel");

const router = express.Router();

router.post("/entry", async (req, res) => {
  const { employeeId } = req.body;

  try {
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const now = new Date();
    const ISTDate = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const hours = ISTDate.getHours();
    const minutes = ISTDate.getMinutes();
    const currentTime = hours * 60 + minutes;

    let status = null;

    if (currentTime >= 540 && currentTime <= 600) {
      // 9:00–9:30
      status = "Present";
    } else if (currentTime >= 660 && currentTime <= 690) {
      // 11:00–11:30
      status = "Late";
    } else {
      status = "Absent";
    }

    const date = ISTDate.toISOString().split("T")[0]; // yyyy-mm-dd

    await AttendanceModel.updateOne(
      { employeeId: employee._id, date },
      { $set: { status, markedAt: ISTDate } },
      { upsert: true }
    );

    res.json({
      message:
        status === "Absent"
          ? "You missed attendance window. Marked as Absent."
          : `Attendance marked as ${status}`,
      status,
    });
  } catch (err) {
    console.error("Error marking attendance:", err.message);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
});


router.post("/regularizations", async (req, res) => {
  const { employeeId, date, requestedStatus, reason } = req.body;

  if (!employeeId || !requestedStatus || !date || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!["Present", "Late"].includes(requestedStatus)) {
    return res.status(400).json({ message: "Invalid status requested" });
  }

  try {
    const existing = await RegularizationModel.findOne({
      employeeId,
      date,
      status: "Pending",
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Request already submitted for this date." });
    }

    const newRequest = new RegularizationModel({
      employeeId,
      date,
      requestedStatus,
      reason,
    });
    await newRequest.save();

    res.json({ message: "Regularization request submitted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

router.put("/regularizations/:id", async (req, res) => {
  const { id } = req.params;
  const { action, adminId } = req.body; // action: "Approve" | "Reject"

  try {
    const request = await RegularizationModel.findById(id);
    if (!request || request.status !== "Pending") {
      return res.status(404).json({ message: "No pending request found." });
    }

    request.status = action === "Approve" ? "Approved" : "Rejected";
    request.reviewedBy = adminId;
    request.reviewedAt = new Date();

    await request.save();

    // If approved, update attendance
    if (action === "Approve") {
      await AttendanceModel.updateOne(
        { employeeId: request.employeeId, date: request.date },
        {
          $set: {
            status: request.requestedStatus,
            markedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    res.json({ message: `Request ${action}d.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});
// In router.get("/employee/:employeeId")
router.get("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const { startDate, endDate, page = 1, limit = 10 } = req.query;

  try {
    const query = { employeeId };
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const records = await AttendanceModel.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await AttendanceModel.countDocuments(query);
    res.json({ records, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// In router.get("/get-regularizations")
router.get("/get-regularizations", async (req, res) => {
  const { status, employeeId, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (employeeId) filter.employeeId = employeeId;

  try {
    const requests = await RegularizationModel.find(filter)
      .populate("employeeId", "firstname lastname avatar")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await RegularizationModel.countDocuments(filter);
    res.json({ requests, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error("Error fetching regularization details", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
