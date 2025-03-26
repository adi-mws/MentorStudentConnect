import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    graduationYear: { type: Number, required: true },
    registrationNumber: { type: String, required: true },
    department: { type: String, required: true },
    joiningYear: { type: Number, required: true },
    organisation: { type: String, required: true },

    isActive: { type: Boolean, default: true }
},
    { timestamps: true }
);

const Alumni = mongoose.model('Alumni', AlumniSchema);
export default Alumni;
