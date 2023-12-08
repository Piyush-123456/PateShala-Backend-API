const express = require("express");
const router = express.Router();
const { resume, addeducation, editeducation, deleteeducation,
    addjob, editjob, deletejobs, addaccomplishment, editaccomplishment,
    deleteaccomplishment, addcourse, editcourse, deletecourse, addinternship,
    editinternship, deleteinternship, addResponsiblity, editResponsiblity, deleteResponsiblity, addprojects, editprojects, deleteprojects, addskills, editskills, deleteskills } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");
//GET
router.get("/", isAuthenticated, resume)

//----------------------Education---------------------------------------

//POST
router.post("/add-edu", isAuthenticated, addeducation)

//POST
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

//POST
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)

//----------------------Education---------------------------------------

//POST
router.post("/add-job", isAuthenticated, addjob)

//POST
router.post("/edit-jobs/:jobid", isAuthenticated, editjob)


//POST
router.post("/delete-jobs/:jobid", isAuthenticated, deletejobs)

//----------------------Accomplishment---------------------------------------


//POST
router.post("/add-accom", isAuthenticated, addaccomplishment)
//POST
router.post("/edit-accom/:accid", isAuthenticated, editaccomplishment)
//POST
router.post("/delete-accom/:accid", isAuthenticated, deleteaccomplishment)

//---------------------- Courses ---------------------------------------

//POST
router.post("/add-course", isAuthenticated, addcourse)

//POST
router.post("/edit-course/:courseid", isAuthenticated, editcourse)

//POST
router.post("/delete-course/:courseid", isAuthenticated, deletecourse)

//---------------------- Internship ---------------------------------------
//POST
router.post("/add-internship", isAuthenticated, addinternship)
//POST
router.post("/edit-internship/:internid", isAuthenticated, editinternship)

//POST
router.post("/delete-internship/:internid", isAuthenticated, deleteinternship)

//---------------------- Responsiblity ---------------------------------------
//POST
router.post("/add-res", isAuthenticated, addResponsiblity)
//POST
router.post("/edit-res/:resid", isAuthenticated, editResponsiblity)

//POST
router.post("/delete-res/:resid", isAuthenticated, deleteResponsiblity)

//----------------------  projects ---------------------------------------
//POST
router.post("/add-projects", isAuthenticated, addprojects)
//POST
router.post("/edit-projects/:prid", isAuthenticated, editprojects)

//POST
router.post("/delete-projects/:prid", isAuthenticated, deleteprojects)

//----------------------  Skills  ---------------------------------------
//POST
router.post("/add-skills", isAuthenticated, addskills)
//POST
router.post("/edit-skills/:skid", isAuthenticated, editskills)

//POST
router.post("/delete-skills/:skid", isAuthenticated, deleteskills)


module.exports = router;    