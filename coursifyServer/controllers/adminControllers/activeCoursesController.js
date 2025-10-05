const Course = require("../../models/Course");

// Active courses - return all fields
exports.getActiveCourses = async (req, res) => {
  try {
    const activeCourses = await Course.find({
      course_status: "active",
    }).populate("teachers_user_id", "name email"); // populate instructor details

    res.json(activeCourses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
