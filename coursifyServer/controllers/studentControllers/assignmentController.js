const Assignment = require("../../models/AssignmentNotes");

// Get assignments for the logged-in student
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.user.id });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
