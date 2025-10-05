const Course = require("../../models/Course");
const User = require("../../models/User");

// Get details of students in teacher's courses
exports.getStudentDetails = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const students = await User.find({
      enrolledCourses: { $in: courses.map((c) => c._id) },
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
