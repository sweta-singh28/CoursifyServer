const Assignment = require("../../models/AssignmentNotes");

exports.getAssignment = async (req, res) => {
  try {
    const {
      AN_link,
      AN_title,
      AssignmentDeadline,
      Users_user_id, // array of user IDs
      Courses_idCourses,
    } = req.body;

    const AssignmentOrNotes = true; // true for assignment, false for notes
    const creation_date = Date.now();

    // Validate input
    if (
      !Users_user_id ||
      !Array.isArray(Users_user_id) ||
      Users_user_id.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Users_user_id must be a non-empty array" });
    }

    // Prepare all assignments for each user
    const assignmentsToInsert = Users_user_id.map((userId) => ({
      AN_link,
      AN_title,
      AssignmentOrNotes,
      AssignmentDeadline,
      creation_date,
      Users_user_id: userId, // one user per assignment
      Courses_idCourses,
    }));

    // Save all at once
    const savedAssignments = await Assignment.insertMany(assignmentsToInsert);

    res.status(201).json({
      message: "Assignments added successfully for all users",
      count: savedAssignments.length,
      assignments: savedAssignments,
    });
  } catch (err) {
    console.error("Error adding assignments:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const {
      AN_link,
      AN_title,
      AssignmentDeadline,
      Users_user_id, // array of user IDs
      Courses_idCourses,
    } = req.body;

    const AssignmentOrNotes = false; // true for assignment, false for notes
    const creation_date = Date.now();

    // Validate input
    if (!Users_user_id || !Array.isArray(Users_user_id) || Users_user_id.length === 0) {
      return res
        .status(400)
        .json({ error: "Users_user_id must be a non-empty array" });
    }

    // Prepare all notes for each user
    const notesToInsert = Users_user_id.map((userId) => ({
      AN_link,
      AN_title,
      AssignmentOrNotes,
      AssignmentDeadline,
      creation_date,
      Users_user_id: userId, // one user per note
      Courses_idCourses,
    }));

    // Save all at once
    const savedNotes = await Assignment.insertMany(notesToInsert);

    res.status(201).json({
      message: "Notes added successfully for all users",
      count: savedNotes.length,
      notes: savedNotes,
    });
  } catch (err) {
    console.error("Error adding notes:", err);
    res.status(500).json({ error: "Server error" });
  }
};
