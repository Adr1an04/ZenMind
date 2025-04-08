import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
    },
  mood: {
    type: String,
    required: true,
    enum: ['Happy', 'Neutral', 'Sad', 'Anxious', 'Calm', 'Angry', 'Frustrated', 'Tired'],
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  notes: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Mood = mongoose.models.Mood || mongoose.model('Mood', moodSchema);

export default Mood; 
