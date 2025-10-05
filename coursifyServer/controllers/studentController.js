const Assignment = require("../models/AssignmentNotes");
const Course = require("../models/Course");

// Get assignments for the logged-in student
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.user.id });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

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

// Course Details → details of one course by ID
exports.courseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
