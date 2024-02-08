const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userEmail: { type: String, required: true },
        userName: { type: String, required: true },
        userPassword: { type: String, required: true }
    },
    { timestamps: true }
);

const userSch = mongoose.model("user", userSchema);
module.exports = {userSch};

