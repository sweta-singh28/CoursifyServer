const User = require("../models/User");
const Course = require("../models/Course");

// Admin dashboard (basic stats) yeh ek single banega
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeCourses = await Course.countDocuments({ status: "active" });

    res.json({
      totalUsers,
      totalCourses,
      activeCourses,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Pending approvals (example: courses awaiting approval) yeh ek single banega samjhe?? aise har functions seperate honge
exports.getPendingApprovals = async (req, res) => {
  try {
    const pendingCourses = await Course.find({ status: "pending" });
    res.json(pendingCourses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// User details
exports.getUserDetails = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Course details
exports.getCourseDetails = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Total users count
exports.getTotalUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Total courses count
exports.getTotalCourses = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.json({ totalCourses: count });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Active courses
exports.getActiveCourses = async (req, res) => {
  try {
    const active = await Course.find({ status: "active" });
    res.json(active);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Completed courses
exports.getCompletedCourses = async (req, res) => {
  try {
    const completed = await Course.find({ status: "completed" });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
