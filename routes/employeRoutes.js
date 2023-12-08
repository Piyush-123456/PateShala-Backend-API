const express = require("express");
const router = express.Router();
const { homepage,
    employesignup,
    employesignin,
    employesignout,
    currentEmploye,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
//GET
router.get("/", homepage)

// //Post
router.post("/current", isAuthenticated, currentEmploye)

//POST/employe/Signup
router.post("/signup", employesignup);
// //POST/employe/signin
router.post("/signin", employesignin);
// //POST/employe/Signup
router.get("/signout", isAuthenticated, employesignout);
// //POST/employe/send-mail
router.post("/send-mail", employesendmail);
// //GET/employe/Forget Link
router.post("/forget-link/", employeforgetlink)
// //Post/employe/reset-password/
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);


// //Post/employe/update/
router.post("/update/:id", isAuthenticated, employeupdate);


// //Post/employe/avatar/:employeid
router.post("/avatar/:id", isAuthenticated, employeavatar);

// ----------------------- Internship ------------------------------
//POST/employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);
//POST/employe/internship/read
router.post("/internship/read", isAuthenticated,readinternship);
//POST/employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated,readsingleinternship);

// ----------------------- Job  ------------------------------
//POST/employe/internship/create
router.post("/job/create", isAuthenticated, createjob);
//POST/employe/job/read
router.post("/job/read", isAuthenticated,readjob);
//POST/employe/job/read/:id
router.post("/job/read/:id", isAuthenticated,readsinglejob);


module.exports = router;    