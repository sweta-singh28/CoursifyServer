const Course = require("../../models/Course");

// Course details by ID
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params; // get courseId from URL
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
