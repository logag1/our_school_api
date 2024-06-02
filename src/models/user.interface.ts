import { model, Schema } from 'mongoose';

export const User = model(
  "users",
  new Schema({
    nickname: {
      type: String,
      required: true
    },
    profile_img: {
      type: String,
      required: true
    },
    refresh_token: {
      type: String,
      required: true
    },
    user_id: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  })
);