const Assignment = require("../../models/AssignmentNotes");

// Upload notes / assignments
exports.getUploadMaterials = async (req, res) => {
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
