const Course = require("../../models/Course");
const AssignmentNotes = require("../../models/AssignmentNotes"); // ✅ import this model
const User = require("../../models/User");
// ✅ Get course details + notes (GET /api/courses/:courseId)
exports.courseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    // ✅ Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // ✅ Find all notes for this course where assignmentOrNotes = 1
    const notes = await AssignmentNotes.find({
      Courses_idCourses: courseId,
      assignmentOrNotes: 1,
    });

    // ✅ (Optional) Populate teacher if needed
    // const course = await Course.findById(courseId).populate("teachers_user_id", "first_name last_name email");
    const teacher = await User.findById(course.teachers_user_id);
    // ✅ Structured response
    res.status(200).json({
      success: true,
      data: {
        course,
        notes,
        teacher,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching course details:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
