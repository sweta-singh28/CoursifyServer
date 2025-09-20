const User = require("../models/User");
const Course = require("../models/Course");

exports.getTotalUsers = async (req, res) => {
  const count = await User.countDocuments();
  res.json({ totalUsers: count });
};

exports.getTotalCourses = async (req, res) => {
  const count = await Course.countDocuments();
  res.json({ totalCourses: count });
};

exports.getActiveCourses = async (req, res) => {
  const active = await Course.find({ status: "active" });
  res.json(active);
};

exports.getCompletedCourses = async (req, res) => {
  const completed = await Course.find({ status: "completed" });
  res.json(completed);
};
