const mongoose = require("mongoose");
const jobModel = new mongoose.Schema({
    students : [ { type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    employe: { type: mongoose.Schema.Types.ObjectId, ref: 'employe' },
    title: String,
    skill: String,
    jobtype: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    description: String,
    preference: String,
    salary: Number,
    perks: String,
    assesments: String,
},

    { timestamps: true }
);

jobModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

const Job = mongoose.model("job", jobModel);
module.exports = Job;