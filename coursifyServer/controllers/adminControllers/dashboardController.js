const User = require("../../models/User");
const Course = require("../../models/Course");

// Admin dashboard (basic stats)
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeCourses = await Course.countDocuments({ status: "active" });

    res.json({ totalUsers, totalCourses, activeCourses });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
