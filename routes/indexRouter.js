const express = require("express");
const router = express.Router();
const {homepage,studentsignup,studentsignin,studentsignout,currentUser,studentsendmail,studentforgetlink, studentresetpassword,studentupdate,studentavatar,applyinternship,applyjob,deletestudent,deleteemploye, readalljobs,readallinternships} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
//GET
router.get("/",homepage)

//Post
router.post("/student",isAuthenticated,currentUser)
//POST/Student/Signup   
router.post("/student/signup",studentsignup);
//POST/Student/Signup
router.post("/student/signin",studentsignin);
//POST/Student/Signup
router.get("/student/signout",isAuthenticated,studentsignout);
//POST/Student/send-mail
router.post("/student/send-mail",studentsendmail);
//GET/Student/Forget Link
router.get("/student/forget-link/",studentforgetlink)

//Post/Student/reset-password/
router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword);
//Post/Student/update/
router.post("/student/update/:id",isAuthenticated,studentupdate);

//Post/Student/avatar/:Studentid
router.post("/student/avatar/:id",isAuthenticated,studentavatar);

//-------------------- Read Jobs ----------------------------------
router.post("/student/alljobs/",isAuthenticated,readalljobs);

//-------------------- Read Internships ----------------------------
router.post("/student/allinternships/",isAuthenticated,readallinternships)

//--------------------- Apply Internship ---------------------------
//Post/Student/apply/:internshipid"
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship);

//--------------------- Apply Job -----------------------
//Post/Student/apply/:jobid"
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob);

//--------------------- Apply Job -----------------------

//Post/Student/delete/:jobid"
router.post("/student/delete/:id",isAuthenticated,deletestudent);

//Post/Student/apply/:jobid"
router.post("/employe/delete/:id",isAuthenticated,deleteemploye);


module.exports = router;    