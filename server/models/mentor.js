import mongoose from "mongoose";

const mentorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expertise: [String],
  students: [
    { 
        type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile' 
    }],
  alumni: [
    { 
        type: mongoose.Schema.Types.ObjectId, ref: 'AlumniProfile' }
    ],
  publicGoals: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }
    ]
});

const MentorProfile = mongoose.model('MentorProfile', mentorProfileSchema);
module.exports = MentorProfile;
