import { Schema } from 'mongoose';

export const Comment = new Schema({
  nickname: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  commentId: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});