// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: { type: String, maxlength: 45 },
    course_pre_requisites: { type: String, maxlength: 45 },
    course_syllabus: { type: Object }, // JSON
    course_code: { type: String, maxlength: 45 },
    course_status: { type: String, maxlength: 15 },
    course_description: { type: String, maxlength: 150 },
    course_thumbnail: { type: String, maxlength: 75 },
    course_current_completed: { type: Object }, // JSON
    course_active_students: { type: Object }, // JSON
    course_pending_students: { type: Object }, // JSON
    teachers_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Course", courseSchema);
