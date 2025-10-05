const Course = require("../../models/Course");
const User = require("../../models/User");

// Pending student approvals for teacher's courses
exports.getPendingStudentApproval = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const pendingStudents = await User.find({
      requestedCourses: { $in: courses.map((c) => c._id) },
      status: "pending",
    });
    res.json(pendingStudents);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
