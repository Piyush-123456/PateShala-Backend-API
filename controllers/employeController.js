const { catchAsyncErrors } = require("../middlewares/catchAsyncErros")
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler")
const { sendtoken } = require('../utils/SendToken')
const { sendmail } = require('../utils/nodemailer');
const path = require("path")
const imagekit = require('../utils/imagekit').initImageKit();
exports.homepage = async (req, res, next) => {
        res.json({ message: "Secure Employee HomePage!" });
};
exports.employesignup = catchAsyncErrors(async (req, res, next) => {
        const employe = await new Employe(req.body).save();
        sendtoken(employe, 201, res)
});
exports.currentEmploye = async (req, res, next) => {
        const employe = await Employe.findById(req.id).exec();
        res.json({ employe })
};
exports.employesignin = catchAsyncErrors(async (req, res, next) => {
        const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();
        if (!employe) return next(new ErrorHandler("User not found with this email address", 404))
        const isMatch = employe.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500))
        console.log(employe)
        sendtoken(employe, 200, res)

});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
        res.clearCookie("token");
        res.json({ message: "Successfully signout !" })
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {

        const employe = await Employe.findOne({ email: req.body.email }).exec();
        if (!employe)
                return next(
                        new ErrorHandler("User not found with this email Address", 404)
                );

        const url = Math.floor(Math.random() * 9000 + 1000)
        sendmail(req, res, next, url)
        employe.resetPasswordToken = `${url}`;
        await employe.save();
        res.json({ message: "mail sent successfulyy check inbox" });

});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {

        const employe = await Employe.findOne({ email: req.body.email }).exec();
        if (!employe)
                return next(
                        new ErrorHandler("User not found with this email Address", 404)
                );

        if (employe.resetPasswordToken == req.body.otp) {
                employe.resetPasswordToken = "0"
                employe.password = req.body.password;
                await employe.save();

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

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
        const employe = await Employe.findById(req.id).exec();
        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe, 201, res)
});



exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
        await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
        res.status(200).json({
                success: true,
                message: "employe Details Updated Successfully",
        })
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
        const employe = await Employe.findById(req.params.id).exec();
        const file = req.files.organzationlogo;
        const modifiedFileName = `resumebuilder'-${Date.now()}${path.extname(file.name)}`

        if (employe.organzationlogo.fileId !== "") {
                await imagekit.deleteFile(employe.organzationlogo.fileId)
        }

        const { fileId, url } = await imagekit.upload({
                file: file.data,
                fileName: modifiedFileName,
        });
        employe.organzationlogo = { fileId, url }
        await employe.save();
        res.status(200).json({
                success: true,
                message: "Profile Updated!"
        });
});



// ----------------------- Internship ------------------------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
        const employe = await Employe.findById(req.id).exec();
        const internship = await new Internship(req.body);
        internship.employe = employe._id;
        employe.internships.push(internship._id);
        await internship.save();
        await employe.save();
        console.log(employe);
        res.status(201).json({
                success: true,
                internship
        })
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
        const { internships } = await Employe.findById(req.id).populate("internships").exec();
        console.log(internships)
        res.status(200).json({
                success: true,
                internships
        })
});

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
        const internship = await Internship.findById(req.params.id).exec();
        res.status(200).json({
                success: true,
                internship
        })
});




// ----------------------- Job ------------------------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
        const employe = await Employe.findById(req.id).exec();
        const job = await new Job(req.body);
        job.employe = employe._id;
        employe.jobs.push(job._id);
        await job.save();
        await employe.save();
        console.log(employe)
        res.status(201).json({
                success: true,
                job
        })
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
        const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
        console.log(jobs); 
        res.status(200).json({
                success: true,
                jobs
        })
});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
        const job = await Job.findById(req.params.id).exec();
        res.status(200).json({
                success: true,
                job
        })
});

