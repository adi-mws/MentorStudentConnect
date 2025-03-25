import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    department: { type: String, required: true },
    joiningYear: { type: Number, required: true },
    registrationNumber: { type: String, required: true },



    isActive: { type: Boolean, default: true }
},
    { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;
