const express = require("express");
const router = express.Router();
const {
  getTotalUsers,
  getTotalCourses,
  getActiveCourses,
  getCompletedCourses,
} = require("../controllers/adminController");
// console.log("✅ Admin routes loaded");


// router.get("/totalusers", getTotalUsers);
router.get("/totalcourses", getTotalCourses);
router.get("/activecourses", getActiveCourses);
router.get("/completedcourses", getCompletedCourses);

router.get(
  "/totalusers",
  (req, res, next) => {
    console.log("🔥 /api/admin/totalusers route hit");
    next();
  },
  getTotalUsers
);


module.exports = router;
