const Course = require("../../models/Course");
const User = require("../../models/User");

// Teacher dashboard → summary stats
exports.getTeacherDashboard = async (req, res) => {
  try {
    console.log("Fetching teacher dashboard for user:", req.user);
    const courses = await Course.find({ teachers_user_id: req.user.userId });
    const totalCourses = courses.length;
    const totalStudents = await User.countDocuments({
      enrolledCourses: { $in: courses.map((c) => c._id) },
    });
    
    res.json({ totalCourses, totalStudents, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
