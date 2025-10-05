const express = require("express");
const router = express.Router();

// Import controllers separately
const {
  getAdminDashboard,
} = require("../controllers/adminControllers/dashboardController");
const {
  getPendingApprovals,
} = require("../controllers/adminControllers/pendingApprovalsController");
const {
  getUserDetails,
} = require("../controllers/adminControllers/userDetailsController");
const {
  getCourseDetails,
} = require("../controllers/adminControllers/courseDetailsController");
const {
  getTotalUsers,
} = require("../controllers/adminControllers/totalUsersController");
const {
  getTotalCourses,
} = require("../controllers/adminControllers/totalCoursesController");
const {
  getActiveCourses,
} = require("../controllers/adminControllers/activeCoursesController");
const {
  getCompletedCourses,
} = require("../controllers/adminControllers/completedCoursesController");
const auth = require("../middleware/auth");

// Define routes
router.use(auth);
router.get("/admindashboard", getAdminDashboard);
router.get("/pendingapprovals", getPendingApprovals);
router.get("/userdetails/:userId", getUserDetails);
router.get("/coursedetails/:courseId", getCourseDetails); 
router.get("/totalusers", getTotalUsers);
router.get("/totalcourses", getTotalCourses);
router.get("/activecourses", getActiveCourses);
router.get("/completedcourses", getCompletedCourses);

module.exports = router;
