const express = require("express");
const router = express.Router();
const {
  getAssignments,
  submitAssignment,
  dashboard,
  courseDetails,
} = require("../controllers/studentController");

router.get("/assignments", getAssignments);
router.post("/submitassignment", submitAssignment);
router.get("/dashboard", dashboard);
router.get("/coursedetails/:courseId", courseDetails);

module.exports = router;
