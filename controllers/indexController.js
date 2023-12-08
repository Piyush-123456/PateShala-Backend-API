const { catchAsyncErrors } = require("../middlewares/catchAsyncErros")
const Student = require("../models/studentModel")
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")
const Employe = require("../models/employeModel")
const ErrorHandler = require("../utils/ErrorHandler")
const { sendtoken } = require('../utils/SendToken')
const { sendmail } = require('../utils/nodemailer');
const path = require("path")
const imagekit = require('../utils/imagekit').initImageKit();
exports.homepage = async (req, res, next) => {
        res.json({ message: "Secure HomePage!" });
};
exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
        const student = await new Student(req.body).save();
        sendtoken(student, 201, res)
});
exports.currentUser = catchAsyncErrors(async (req, res, next) => {
        const student = await Student.findById(req.id)
                .populate("jobs")
                .populate("internships")
                .exec();

        if (!student) {
                return res.status(404).json({ message: "Student not found" });
        }
        res.json({ student })
});
exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
        const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
        const isMatch = await student.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500))
        sendtoken(student, 200, res)
});
exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
        res.json({ message: "Successfully signout !" })
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {

        const student = await Student.findOne({ email: req.body.email }).exec();
        if (!student)
                return next(
                        new ErrorHandler("User not found with this email Address", 404)
                );

        const url = Math.floor(Math.random() * 9000 + 1000);
        student.resetPasswordToken = `${url}`;
        await student.save();
        res.json({ message: "mail sent successfully check inbox/spam" });

});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {

        const student = await Student.findOne({ email: req.body.email }).exec();
        if (!student)
                return next(
                        new ErrorHandler("User not found with this email Address", 404)
                );

        if (student.resetPasswordToken == req.body.otp) {
                await student.save();

        }
        else {
                return next(
                        new ErrorHandler("Invalid Reset Password Link", 500)
                );
        }

        res.status(200).json({
                message: "Password has been successfully changed"
        });

});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
        const student = await Student.findById(req.id).exec();
        sendtoken(student, 201, res)
});



exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
        res.status(200).json({
                success: true,
                message: "Student Details Updated Successfully",
        })
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
        const student = await Student.findById(req.params.id).exec();

        if (student.avatar.fileId !== "") {
                await imagekit.deleteFile(student.avatar.fileId)
        }

        const { fileId, url } = await imagekit.upload({
                file: file.data,
                fileName: modifiedFileName,
        });
        student.avatar = { fileId, url }
        await student.save();
        res.status(200).json({
                success: true,
                message: "Profile Updated!"
        });
});

//-------------------- Apply Internship -----------------------
exports.applyinternship = async (req, res, next) => {
        const student = await Student.findById(req.id).exec();
        const internship = await Internship.findById(req.params.internshipid).exec();
        student.internships.push(internship._id);
        internship.students.push(student._id);
        await student.save();
        await internship.save();
        res.json({ student, internship })
};
//-------------------- Apply Job -----------------------
exports.applyjob = async (req, res, next) => {
        const student = await Student.findById(req.id).exec();
        const job = await Job.findById(req.params.jobid).exec();
        student.jobs.push(job._id);
        job.students.push(student._id);
        await student.save();
        await job.save();
        res.json({ student, job })
};
//---------------- Delete operation ------------------------------------------
exports.deletestudent = catchAsyncErrors(async (req, res, next) => {
        const studentId = req.params.id;

        try {
                // Find and delete the student by ID
                const deletedStudent = await Student.findOneAndDelete({ _id: studentId });

                if (!deletedStudent) {
                        // Student not found
                        return res.status(404).json({ message: 'Student not found' });
                }

                res.json({ message: 'Student deleted successfully', deletedStudent });
        } catch (error) {
                console.error('Error deleting student:', error);
                res.status(500).json({ message: 'An error occurred while deleting the student' });
        }
});

exports.deleteemploye = catchAsyncErrors(async (req, res, next) => {
        const empolyeId = req.params.id;

        try {
                // Find and delete the student by ID
                const deletedEmploye = await Employe.findOneAndDelete({ _id: empolyeId });

                if (!deletedEmploye) {
                        // Student not found
                        return res.status(404).json({ message: 'Employe not found' });
                }

                res.json({ message: 'Employe deleted successfully', deletedEmploye });
        } catch (error) {
                console.error('Error deleting Employe:', error);
                res.status(500).json({ message: 'An error occurred while deleting the Employe' });
        }
});

exports.readalljobs = catchAsyncErrors(async (req, res, next) => {
        const jobs = await Job.find().exec();
        res.status(200).json({ jobs });
});

exports.readallinternships = catchAsyncErrors(async (req, res, next) => {
        const internships = await Internship.find().exec();
        res.status(200).json({ internships });
});
