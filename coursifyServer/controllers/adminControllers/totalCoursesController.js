const Course = require("../../models/Course");

// List of all courses with all fields
exports.getTotalCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate(
      "teachers_user_id",
      "name email"
    ); // populate instructor details

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
