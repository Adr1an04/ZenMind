import mongoose from 'mongoose';

const gratitudeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gratitude = mongoose.models.Gratitude || mongoose.model('Gratitude', gratitudeSchema);

export default Gratitude; 