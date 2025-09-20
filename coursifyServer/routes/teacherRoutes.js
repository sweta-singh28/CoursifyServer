const express = require("express");
const router = express.Router();
const {
  addCourse,
  uploadNotes,
  viewSubmissions,
  pendingStudentApproval,
} = require("../controllers/teacherController");

router.post("/addcourse", addCourse);
router.post("/uploadnotes", uploadNotes);
router.get("/viewsubmissions", viewSubmissions);
router.get("/pendingstudentapproval", pendingStudentApproval);

module.exports = router;
