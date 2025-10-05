const Course = require("../../models/Course");

// Course Details → details of one course by ID
exports.courseDetails = async (req, res) => {
  try {
    const { courseId } = req.query;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
