// models/SubmittedAssignment.js
const mongoose = require("mongoose");

const submittedAssignmentSchema = new mongoose.Schema(
  {
    submission_link: { type: String, maxlength: 45 },
    submission_time: { type: Date, default: Date.now },
    approval: { type: String, maxlength: 10 },
    Assignment_Notes_AN_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssignmentNotes",
    },
    Users_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "SubmittedAssignment",
  submittedAssignmentSchema
);
