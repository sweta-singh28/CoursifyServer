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
const { availCourses } = require("../controllers/studentControllers/availCoursesController");
const auth = require("../middleware/auth");
// Routes
router.use(auth);
router.get("/assignments", getAssignments);
router.get("/dashboard", dashboard);
router.get("/coursedetails/:courseId", courseDetails);
router.get("/courses",availCourses);

module.exports = router;
