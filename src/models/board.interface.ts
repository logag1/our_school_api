import { model, Schema } from 'mongoose';
import { Comment } from './comment.interface';

export const Post = model(
  "posts",
  new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    like: {
      type: Number,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    comments: [Comment]
  }, {
    timestamps: true
  })
);