const Course = require("../../models/Course");

// Completed courses - return all fields
exports.getCompletedCourses = async (req, res) => {
  try {
    const completedCourses = await Course.find({
      course_status: "completed",
    }).populate("teachers_user_id", "name email"); // populate instructor details

    res.json(completedCourses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
