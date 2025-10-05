const Course = require("../../models/Course");

// Dashboard → enrolled + pending approval courses
exports.dashboard = async (req, res) => {
  try {
    const enrolledCourses = await Course.find({
      students: req.user.id,
      status: "active",
    });
    const pendingCourses = await Course.find({
      students: req.user.id,
      status: "pending",
    });

    res.json({
      enrolledCount: enrolledCourses.length,
      pendingCount: pendingCourses.length,
      enrolledCourses,
      pendingCourses,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
