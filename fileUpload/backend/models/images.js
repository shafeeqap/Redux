import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    enum: ['image/jpeg', 'image/png', 'image/gif'],
  },
  data: {
    type: Buffer,
    required: true,
  },
});

export const Image = mongoose.model("Image", imageSchema);
