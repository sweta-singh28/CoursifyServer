const User = require("../../models/User");

// Register a student to a course
exports.getStudentRegister = async (req, res) => {
  try {
    
    const student = await User.find({});
    
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
