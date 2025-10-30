const Courses = require("../../models/Course");

exports.availCourses = async (req, res) => {
  try {
    // Find all courses with status 'active'
    const activeCourses = await Courses.find({ course_status: "Active" });

    // If no courses found
    if (!activeCourses || activeCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active courses found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      count: activeCourses.length,
      data: activeCourses,
    });
  } catch (error) {
    console.error("Error fetching active courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
      error: error.message,
    });
  }
};
