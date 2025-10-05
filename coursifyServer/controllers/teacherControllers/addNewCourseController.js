const Course = require("../../models/Course");

// Add new course
exports.getAddNewCourse = async (req, res) => {
  try {
    const {
      course_name,
      course_pre_requisites,
      course_syllabus,
      course_code,
      course_status,
      course_description,
      course_thumbnail,
      course_current_completed,
      course_active_students,
      course_pending_students,
    } = req.body;

    const course = new Course({
      course_name,
      course_pre_requisites,
      course_syllabus,
      course_code,
      course_status,
      course_description,
      course_thumbnail,
      course_current_completed,
      course_active_students,
      course_pending_students,
      teachers_user_id: req.user.id, // from logged-in teacher
    });

    await course.save();
    res.json({ message: "Course added successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
