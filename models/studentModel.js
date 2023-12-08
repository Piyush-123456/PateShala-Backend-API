const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const studentModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name  is required"],
        minLength: [4, "First name should be atleast 4 Character Long"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name  is required"],
        minLength: [4, "Last name should be atleast 4 Character Long"]
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        maxLength: [10, "Contact must not be exceed 10 Character Long"],
        minLength: [10, "Contact should be atleast 10 Character Long"]

    },
    city: {
        type: String,
        required: [true, "City Name  is required"],
        minLength: [3, "City name should be atleast 3 Character Long"]
    },
    gender: { type: String, enum: ["Male", "Female", "Others"] },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [
            15,
            "Password should not exceed more than 15 Character"
        ],

        minLength: [
            6,
            "Password should have atleast 6 Characters"
        ],
        // match:

    },
    resetPasswordToken: {
        type: String,
        default: "0"
    },
    avatar: {
        type: Object,
        default: {
            fileId: '',
            url: 'https://images.unsplash.com/photo-1695349091060-6fb89be83290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
        }
    },
    resume: {
        education: [],
        jobs: [],
        internships: [],
        responsibilites: [],
        courses: [],
        projects: [],
        skills: [],
        accomplishments: []
    },
    internships: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'internship' }
    ],
    jobs: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'job' }

    ]
},
    { timestamps: true }
);

studentModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});
studentModel.methods.comparepassword = function (password) {    
    return bcrypt.compareSync(password, this.password)
}                       
studentModel.methods.getjwttoken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}


const Student = mongoose.model("students", studentModel);
module.exports = Student;