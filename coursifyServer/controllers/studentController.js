const Assignment = require("../models/Assignment");
const Submission = require("../models/SubmittedAssignment");

const Course = require("../models/Course");

exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find({ student: req.user.id });
  res.json(assignments);
};

exports.submitAssignment = async (req, res) => {
  const { assignmentId, answer } = req.body;
  const submission = new Submission({
    assignmentId,
    student: req.user.id,
    answer,
  });
  await submission.save();
  res.json({ message: "Assignment submitted", submission });
};

exports.dashboard = async (req, res) => {
  const courses = await Course.find({ students: req.user.id });
  res.json({ enrolledCourses: courses.length, courses });
};

exports.courseDetails = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  res.json(course);
};
