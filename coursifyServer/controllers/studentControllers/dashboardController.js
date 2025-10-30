const UserCourse = require("../../models/UserCourses");

// Dashboard → enrolled + pending approval courses
exports.dashboard = async (req, res) => {
  try {
    // console.log(req);
    console.log("Fetching dashboard for user:", req.user.userId);
    // console.log("Request User ID:", req.user);
    const enrolledCourses = await UserCourse.findOne({ user: req.user.userId }).populate("activeCourses").then((data) => data ? data.activeCourses : []);

    const pendingCourses = await UserCourse.findOne({ user: req.user.userId })
      .populate("pendingCourses")
      .then((data) => data ? data.pendingCourses : []);
    console.log("Enrolled Courses:", enrolledCourses);
    console.log("Pending Courses:", pendingCourses);
    res.json({
      enrolledCourses,
      pendingCourses,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
