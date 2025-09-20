const mongoose = require("mongoose");

const submittedAssignmentSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileUrl: String, // if you’re storing file paths with multer
  submittedAt: { type: Date, default: Date.now },
  grade: { type: String, default: "Pending" },
});

module.exports = mongoose.model(
  "SubmittedAssignment",
  submittedAssignmentSchema
);
