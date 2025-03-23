// Group Collection for mentoring group

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  
export default mongoose.model('Group', groupSchema);
  