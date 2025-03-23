const goalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['others', 'primary subject', 'tech', 'soft skills'] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subGoals: [
      {
        title: String,
        isCompleted: { type: Boolean, default: false },
      },
    ],
    isCompleted: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false }, // For public mentor goals
    completionDate: { type: Date },
  });
  
export default mongoose.model('Goal', goalSchema);
  