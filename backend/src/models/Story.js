import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      index: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      unique: true,
      trim: true,
      index: true,
    },
    points: {
      type: Number,
      default: 0,
      index: -1,
    },
    author: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    postedAt: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

storySchema.index({ title: 'text', author: 1 });

const Story = mongoose.model('Story', storySchema);
export default Story;
