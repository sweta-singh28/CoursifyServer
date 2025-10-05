const Course = require("../models/Course");
const Assignment = require("../models/AssignmentNotes");
const Submission = require("../models/SubmittedAssignment");
const User = require("../models/User");

// Teacher dashboard → summary stats
exports.getTeacherDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const totalCourses = courses.length;
    const totalStudents = await User.countDocuments({
      enrolledCourses: { $in: courses.map((c) => c._id) },
    });

    res.json({ totalCourses, totalStudents, courses });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add new course
exports.getAddNewCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({ title, description, teacher: req.user.id });
    await course.save();
    res.json({ message: "Course added", course });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Upload notes / assignments
exports.getUploadNotes = async (req, res) => {
  try {
    const { courseId, title, content } = req.body;
    const assignment = new Assignment({
      course: courseId,
      title,
      content,
      teacher: req.user.id,
    });
    await assignment.save();
    res.json({ message: "Notes/Assignment uploaded", assignment });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// View submissions for teacher's assignments
exports.getViewSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      teacher: req.user.id,
    }).populate("student assignmentId");
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Pending student approvals for teacher's courses
exports.getPendingStudentApproval = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const pendingStudents = await User.find({
      requestedCourses: { $in: courses.map((c) => c._id) },
      status: "pending",
    });
    res.json(pendingStudents);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Subject details (maybe course info)
exports.getSubjectDetails = async (req, res) => {
  try {
    const { courseId } = req.query;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Register a student to a course
exports.getStudentRegister = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.enrolledCourses.push(courseId);
    await student.save();

    res.json({ message: "Student registered to course", student });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get details of students in teacher's courses
exports.getStudentDetails = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    const students = await User.find({
      enrolledCourses: { $in: courses.map((c) => c._id) },
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
