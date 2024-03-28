import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //one who subscribes the user/channel
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //one whom the user/channel have subscribed
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
