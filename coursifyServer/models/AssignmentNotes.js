// models/AssignmentNotes.js
const mongoose = require("mongoose");

const assignmentNotesSchema = new mongoose.Schema(
  {
    AN_link: { type: String, maxlength: 100 },
    AN_title: { type: String, maxlength: 75 },
    AssignmentOrNotes: { type: Boolean }, // TINYINT equivalent
    AssignmentDeadline: { type: Date },
    creation_date: { type: Date, default: Date.now },
    Users_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Courses_idCourses: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("AssignmentNotes", assignmentNotesSchema);
