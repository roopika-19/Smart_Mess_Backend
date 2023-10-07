import mongoose, { Schema } from "mongoose";
import mess from "./mess";
import user from "./user";
import FeedbackForm from "./feedbackForm";

const feedback = new Schema({
  Email: {  //user who gave the feedback
    type: String,
    required: true,
  },
  FormID : {
    type: Schema.Types.ObjectId,
    ref: "FeedbackForm",
    required: true,
  },
  BreakfastRating: {
    type: Number,
    required: true,
  },
  LunchRating: {
    type: Number,
    required: true,
  },
  DinnerRating: {
    type: Number,
    required: true,
  },
  SnacksRating: {
    type: Number,
    required: true,
  },
  Feedback: {
    type: String,
    required: true,
  },
  MessServiceRating: {
    type: Number,
    required: true,
  },
  HygieneRating: {
    type: Number,
    required: true,
  },
  // Mess: {  //we will add this later if we have mutliple messes
  //   type: Schema.Types.ObjectId,
  //   ref: "mess",
  //   required: true,
  // },
});

export default mongoose.model("Feedback", feedback);