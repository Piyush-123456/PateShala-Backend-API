const { catchAsyncErrors } = require("../middlewares/catchAsyncErros")
const Student = require("../models/studentModel")
const ErrorHandler = require("../utils/ErrorHandler")
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resume page!", resume })
});
exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: "Education added successfully" })
});
exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i) => i.id == req.params.eduid);
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "Education Updated" })
});


exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid);
    student.resume.education = filterededu;
    await student.save()
    res.json({ message: "Education Deleted !" })
});

//------------------------Jobs---------------------------------

exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: "Job added successfully" })
});

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.jobs.findIndex((i) => i.id == req.params.jobid);
    student.resume.jobs[eduIndex] = { ...student.resume.jobs[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "Job Updated" })
});



exports.deletejobs = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.jobs.filter((i) => i.id !== req.params.jobid);
    student.resume.jobs = filterededu;
    await student.save()
    res.json({ message: "Job Deleted !" })
});


//------------------------Accomplishment---------------------------------

exports.addaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: "accomplishment added successfully" })
});


exports.editaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.accomplishments.findIndex((i) => i.id == req.params.accid);
    student.resume.accomplishments[eduIndex] = { ...student.resume.accomplishments[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "Accomplishment Updated" })
});

exports.deleteaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.accomplishments.filter((i) => i.id !== req.params.accid);
    student.resume.accomplishments = filterededu;
    await student.save()
    res.json({ message: "Accomplishment Deleted !" })
});


//------------------------ Courses --------------------------------

exports.addcourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: "Course added successfully" })
});

exports.editcourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.courses.findIndex((i) => i.id == req.params.courseid);
    student.resume.courses[eduIndex] = { ...student.resume.courses[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "course Updated" })
});


exports.deletecourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.courses.filter((i) => i.id !== req.params.courseid);
    student.resume.courses = filterededu;
    await student.save()
    res.json({ message: "course Deleted !" })
});


//------------------------ Internship --------------------------------


exports.
    addinternship
    = catchAsyncErrors(async (req, res, next) => {
        const student = await Student.findById(req.id).exec();
        student.resume.internships.push({ ...req.body, id: uuidv4() });
        await student.save()
        res.json({ message: "  internship  added successfully" })
    });


exports.editinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.internships.findIndex((i) => i.id == req.params.internid);
    student.resume.internships[eduIndex] = { ...student.resume.internships[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "internship Updated" })
});


exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.internships.filter((i) => i.id !== req.params.internid);
    student.resume.internships = filterededu;
    await student.save()
    res.json({ message: "Internship Deleted !" })
});

//---------------------- Responsiblity ---------------------------------------

exports.addResponsiblity = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilites.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: "responsibilites  added successfully" })
});


exports.editResponsiblity = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.responsibilites.findIndex((i) => i.id == req.params.resid);
    student.resume.responsibilites[eduIndex] = { ...student.resume.responsibilites[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "responsibilites Updated" })
});


exports.deleteResponsiblity = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.responsibilites.filter((i) => i.id !== req.params.resid);
    student.resume.responsibilites = filterededu;
    await student.save()
    res.json({ message: "responsibilites Deleted !" })
});


//----------------------Projects ---------------------------------------

exports.addprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: " projects  added successfully" })
});


exports.editprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.projects.findIndex((i) => i.id == req.params.prid);
    student.resume.projects[eduIndex] = { ...student.resume.projects[eduIndex], ...req.body }
    await student.save()
    res.json({ message: " projects Updated" })
});


exports.deleteprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.projects.filter((i) => i.id !== req.params.prid);
    student.resume.projects = filterededu;
    await student.save()
    res.json({ message: "projects Deleted !" })
});


//---------------------- skills ---------------------------------------

exports.addskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save()
    res.json({ message: " skills  added successfully" })
});


exports.editskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.skills.findIndex((i) => i.id == req.params.skid);
    student.resume.skills[eduIndex] = { ...student.resume.skills[eduIndex], ...req.body }
    await student.save()
    res.json({ message: "skills Updated" })
});


exports.deleteskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.skills.filter((i) => i.id !== req.params.skid);
    student.resume.skills = filterededu;
    await student.save()
    res.json({ message: "skills Deleted !" })
});