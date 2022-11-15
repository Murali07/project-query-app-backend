const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {type: String, required: true},
    role: {type: String, default: "user"},
    createAt: {type: Date, default: Date.now()}
})

const querySchema = new mongoose.Schema({
    category: {type: String, required: true},
    language: {type: String, required: true},
    queryTitle: {type: String, required: true},
    queryDescription: {type: String, required: true},
    availableTime: {type: Date, required: true},
    createAt: {type: Date, default: Date.now()}
})


let userModel = mongoose.model("users", userSchema);
let queryModel = mongoose.model("queries", querySchema);

module.exports = {mongoose, userModel, queryModel};
