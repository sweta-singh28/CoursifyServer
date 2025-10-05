const Course = require("../../models/Course");

// Pending approvals (courses awaiting approval)
exports.getPendingApprovals = async (req, res) => {
  try {
    const pendingCourses = await Course.find({ course_status:"Pending" });// yaha pe wapis schema ke according nhi hai
    res.json(pendingCourses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
