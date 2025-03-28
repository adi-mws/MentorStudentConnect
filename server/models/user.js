import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false},

    email: { type: String, unique: true, required: true },
    password: {
        type: String, required: true
    },

    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'profileModel',
        required: false
    },
    profileModel: {
        type: String,
        enum: ['StudentProfile', 'AlumniProfile', 'MentorProfile'],
        required: false
    },

    role: {
        type: String,
        enum: ['student', 'alumni', 'mentor', 'admin'],
        default: 'student'
    },

    isActive: { type: Boolean, default: true }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
