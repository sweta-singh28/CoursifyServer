const User = require("../../models/User");

// Register a student to a course
exports.getStudentRegister = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.enrolledCourses.push(courseId);
    await student.save();

    res.json({ message: "Student registered to course", student });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
