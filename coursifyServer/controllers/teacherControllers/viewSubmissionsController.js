const Submission = require("../../models/SubmittedAssignment");

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
