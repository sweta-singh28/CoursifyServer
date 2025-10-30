const express = require("express");
const router = express.Router();

// Import controllers separately
const {
  getTeacherDashboard,
} = require("../controllers/teacherControllers/dashboardController");
const {
  getAddNewCourse,
} = require("../controllers/teacherControllers/addNewCourseController");
const {
  getAssignment,getNotes,
} = require("../controllers/teacherControllers/uploadMaterialsController");
const {
  getViewSubmissions,
} = require("../controllers/teacherControllers/viewSubmissionsController");
const {
  getPendingStudentApproval,
} = require("../controllers/teacherControllers/pendingStudentApprovalsController");
const {
  getSubjectDetails,
} = require("../controllers/teacherControllers/subjectDetailsController");
const {
  getStudentRegister,
} = require("../controllers/teacherControllers/studentRegisterController");
const {
  getStudentDetails,
} = require("../controllers/teacherControllers/studentDetailsController");
const auth = require("../middleware/auth");
// const {getUploadMaterials}= require("../controllers/teacherControllers/uploadMaterialsController");

// Routes jaise maine pichle mei sabme auth dala hai waise hi idhar bhi sabme auth daal ne se acha just abhi merko ek idea aya wait
router.use(auth);
router.get("/dashboard", getTeacherDashboard);
router.post("/addnewcourse", getAddNewCourse);
router.post("/newAssignment", getAssignment);
router.post("/newNotes", getNotes);
router.get("/viewsubmissions", getViewSubmissions);
router.get("/pendingstudentapprovals", getPendingStudentApproval); 
router.get("/subjects/:subjectId", getSubjectDetails);
router.get("/getStudents", getStudentRegister);
router.get("/students/:studentId", getStudentDetails);


module.exports = router;
