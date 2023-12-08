const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const employeModel = new mongoose.Schema({
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
    organzationname: {
        type: String,
        required: [true, "Organization Name  is required"],
        minLength: [4, "Organization name should be atleast 4 Character Long"]
    },
    organzationlogo: {
        type: Object,
        default: {
            fileId: '',
            url: 'https://images.unsplash.com/photo-1695349091060-6fb89be83290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
        }
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

employeModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});
employeModel.methods.comparepassword = function (password) {
}
employeModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
const Employe = mongoose.model("employe", employeModel);
module.exports = Employe;