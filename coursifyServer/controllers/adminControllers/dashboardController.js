const User = require("../../models/User");
const Course = require("../../models/Course");

// Admin dashboard (basic stats)
exports.getAdminDashboard = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeCoursesCount = await Course.countDocuments({
      course_status: "Active",
    });
    const pendingCoursesCount = await Course.countDocuments({
      course_status: "Pending",
    });

    // User roles
    const totalTeachers = await User.countDocuments({ user_role: "teacher" });
    const totalStudents = await User.countDocuments({ user_role: "student" });
    const userRoleCounts = { teachers: totalTeachers, students: totalStudents };

    // Per-course active & pending students
    const courses = await Course.find();
    const courseUserData = courses.map((course) => ({
      course_name: course.course_name,
      active_students_count: Array.isArray(course.course_active_students)
        ? course.course_active_students.length
        : 0,
      pending_students_count: Array.isArray(course.course_pending_students)
        ? course.course_pending_students.length
        : 0,
    }));

    // Response
    res.json({
      totalUsers,
      totalCourses,
      activeCourses: activeCoursesCount,
      pendingCourses: pendingCoursesCount,
      userRoleCounts,
      courseUserData,
    });
  } catch (err) {
    console.error("Error in getAdminDashboard:", err);
    res.status(500).json({ error: "Server error" });
  }
};
