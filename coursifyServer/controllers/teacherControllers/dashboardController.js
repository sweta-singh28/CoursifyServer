const Course = require("../../models/Course");
const User = require("../../models/User");

// Teacher dashboard → summary stats
exports.getTeacherDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const totalCourses = courses.length;
    const totalStudents = await User.countDocuments({
      enrolledCourses: { $in: courses.map((c) => c._id) },
    });
    
    res.json({ totalCourses, totalStudents, courses });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
