const Course = require("../models/Course");
const Submission = require("../models/SubmittedAssignment");

exports.addCourse = async (req, res) => {
  const { title, description } = req.body;
  const course = new Course({
    title,
    description,
    status: "active",
    teacher: req.user.id,
  });
  await course.save();
  res.json({ message: "Course added", course });
};

exports.uploadNotes = async (req, res) => {
  const { courseId, notes } = req.body;
  const course = await Course.findById(courseId);
  course.notes.push(notes);
  await course.save();
  res.json({ message: "Notes uploaded", course });
};

exports.viewSubmissions = async (req, res) => {
  const submissions = await Submission.find({ teacher: req.user.id });
  res.json(submissions);
};

exports.pendingStudentApproval = async (req, res) => {
  const students = await User.find({ role: "student", status: "pending" });
  res.json(students);
};
