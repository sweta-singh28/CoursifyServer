const express = require("express");
const router = express.Router();

// Import controllers separately
const {
  getAssignments,
} = require("../controllers/studentControllers/assignmentController");
const {
  dashboard,
} = require("../controllers/studentControllers/dashboardController");
const {
  courseDetails,
} = require("../controllers/studentControllers/viewCourseDetailsController");
const auth = require("../middleware/auth");
// Routes
router.get("/assignments",auth, getAssignments);
router.get("/dashboard",auth, dashboard);
router.get("/coursedetails/:courseId",auth, courseDetails);

module.exports = router;
