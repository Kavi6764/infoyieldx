const express = require("express");
const router = express.Router();
const Leave = require("../Models/LeaveModel");
const authHR = require("../Auth/authHR");
const EmployeeModel = require("../Models/EmployeeModel");

router.post("/apply", async (req, res) => {
  const { employeeId, leaveType, fromDate, toDate, reason } = req.body;

  // Basic validation
  if (!employeeId || !leaveType || !fromDate || !toDate) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Parse dates and validate
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (isNaN(from) || isNaN(to) || from > to) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    // Calculate total leave days
    const leaveDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    // Validate leave type and balance (except unpaid)
    if (leaveType !== "unpaid") {
      const balance = employee.leaveBalance?.[leaveType];
      if (balance === undefined) {
        return res
          .status(400)
          .json({ error: `Invalid leave type: ${leaveType}` });
      }

      if (balance < leaveDays) {
        return res
          .status(400)
          .json({ error: `Not enough ${leaveType} leaves.` });
      }

      await employee.save();
    }

    // Save the leave request
    const newLeave = new Leave({
      employee: employee._id,
      leaveType,
      fromDate: from,
      toDate: to,
      reason,
    });

    await newLeave.save();

    res
      .status(201)
      .json({ message: "Leave application submitted", leave: newLeave });
  } catch (err) {
    console.error("Leave apply error:", err.message);
    res.status(500).json({ error: "Server error while applying for leave" });
  }
});

// Get all leaves (admin/HR)
router.get("/get-leaves", async (req, res) => {
  try {
    const leaves = await Leave.find().populate(
      "employee",
      "firstname lastname leaveBalance  avatar"
    );
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update leave status (approve/reject)
// router.patch("/:id/status", async (req, res) => {
//   const { status } = req.body;

//   if (!["approved", "rejected"].includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   try {
//     const leave = await Leave.findById(req.params.id).populate("employee");

//     if (!leave) {
//       return res.status(404).json({ error: "Leave not found" });
//     }

//     // Only restore balance if it was approved earlier and now getting rejected
//     if (leave.status === "approved" && status === "rejected" && leave.leaveType !== "unpaid") {
//       const from = new Date(leave.fromDate);
//       const to = new Date(leave.toDate);
//       const leaveDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

//       const currentBalance = leave.employee.leaveBalance[leave.leaveType];
//       leave.employee.leaveBalance[leave.leaveType] = currentBalance + leaveDays;

//       await leave.employee.save();
//     }

//     // Update leave status
//     leave.status = status;
//     await leave.save();

//     res.json({ message: "Leave status updated", updated: leave });
//   } catch (err) {
//     console.error("Error updating leave status:", err.message);
//     res.status(500).json({ error: "Server error while updating leave status" });
//   }
// });
// router.patch("/:id/status", async (req, res) => {
//   const { status } = req.body;

//   if (!["approved", "rejected"].includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   try {
//     const leave = await Leave.findById(req.params.id).populate("employee");

//     if (!leave) {
//       return res.status(404).json({ error: "Leave not found" });
//     }

//     // Calculate leave days
//     const from = new Date(leave.fromDate);
//     const to = new Date(leave.toDate);
//     const leaveDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

//     const leaveType = leave.leaveType;
//     const leaveBalance = leave.employee.leaveBalance;

//     // Reversal: approved ➝ rejected
//     if (
//       leave.status === "approved" &&
//       status === "rejected" &&
//       leaveType !== "unpaid"
//     ) {
//       leaveBalance[leaveType] += leaveDays;
//       await leave.employee.save();
//     }

//     // Deduction: pending ➝ approved
//     if (
//       leave.status === "pending" &&
//       status === "approved" &&
//       leaveType !== "unpaid"
//     ) {
//       if (leaveBalance[leaveType] == null) {
//         return res.status(400).json({ error: "Invalid leave type" });
//       }

//       if (leaveBalance[leaveType] < leaveDays) {
//         return res.status(400).json({ error: "Insufficient leave balance" });
//       }

//       leaveBalance[leaveType] -= leaveDays;
//       await leave.employee.save();
//     }
//     res.json({ message: "Leave status updated", updated: leave });
//   } catch (err) {
//     console.error("Error updating leave status:", err.message);
//     res.status(500).json({ error: "Server error while updating leave status" });
//   }
// });

// Get leaves of a specific employee
router.patch("/:id/status", async (req, res) => {
  const { status, edited } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const leave = await Leave.findById(req.params.id).populate("employee");

    if (!leave) {
      return res.status(404).json({ error: "Leave not found" });
    }

    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    const leaveDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    const leaveType = leave.leaveType;
    const leaveBalance = leave.employee.leaveBalance;

    // approved ➝ rejected
    if (leave.status === "approved" && status === "rejected" && leaveType !== "unpaid") {
      leaveBalance[leaveType] += leaveDays;
      await leave.employee.save();
    }

    // pending ➝ approved
    if (leave.status === "pending" && status === "approved" && leaveType !== "unpaid") {
      if (leaveBalance[leaveType] == null) {
        return res.status(400).json({ error: "Invalid leave type" });
      }

      if (leaveBalance[leaveType] < leaveDays) {
        return res.status(400).json({ error: "Insufficient leave balance" });
      }

      leaveBalance[leaveType] -= leaveDays;
      await leave.employee.save();
    }

    // update status
    leave.status = status;
    if (edited) leave.edited = true;

    await leave.save();

    res.json({ message: "Leave status updated", updated: leave });
  } catch (err) {
    console.error("Error updating leave status:", err.message);
    res.status(500).json({ error: "Server error while updating leave status" });
  }
});


router.get("/my-leaves/:empId", async (req, res) => {
  const { empId } = req.params;

  try {
    const leaves = await Leave.find({ employee: empId }).populate(
      "employee",
      "firstname lastname leaveBalance"
    );

    const leavesWithDays = leaves.map((leave) => {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);
      const totalDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

      return {
        ...leave._doc,
        totalDays,
      };
    });

    res.status(200).json({ leaves: leavesWithDays });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
