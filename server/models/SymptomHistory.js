const mongoose = require('mongoose')

const symptomHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    symptoms: {
      type: [String], // array of symptom strings e.g. ["fever", "headache"]
      required: true,
    },
    recommendation: {
      condition: { type: String, required: true },
      severity: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        required: true,
      },
      advice: { type: String, required: true },
      medications: { type: [String], default: [] },
      seeDoctor: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('SymptomHistory', symptomHistorySchema)