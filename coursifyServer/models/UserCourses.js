const mongoose = require("mongoose");

const userCoursesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activeCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  pendingCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  expiredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("UserCourses", userCoursesSchema);
