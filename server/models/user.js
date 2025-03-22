import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["mentor", "student", "admin"],
        default: "student",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model("User", userSchema);

export default User;
