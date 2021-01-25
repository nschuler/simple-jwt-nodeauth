import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    }
  },
  {
    timestamps: true
  }
)

const modelName = 'User';

export default mongoose.model(modelName, instance);