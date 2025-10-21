const UserCourses = require("../../models/UserCourses");

// Dashboard → enrolled + pending approval courses
exports.dashboard = async (req, res) => {
  try {
    console.log("Fetching dashboard for user:", req.user.id);
    const enrolledCourses = await UserCourses.findOne({ user: req.user.id })
      .populate("activeCourses")
      .then((data) => data ? data.activeCourses : []);

    const pendingCourses = await UserCourses.findOne({ user: req.user.id })
      .populate("pendingCourses")
      .then((data) => data ? data.pendingCourses : []);

    res.json({
      enrolledCourses,
      pendingCourses,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
