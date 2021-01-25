import mongoose from 'mongoose';
const { Schema } = mongoose

const instance = new mongoose.Schema(
  {
    token: {
        type: String,
        required: true,
        unique: true,
    },
      _userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
  },
  {
    timestamps: true
  }
)

const modelName = 'Token';

export default mongoose.model(modelName, instance);