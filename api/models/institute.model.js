import mongoose from "mongoose";

const ventureSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["School", "College", "Coaching Institute", "Others"],
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    establishment: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    courses: {
      type: [String],
      required: true,
    },
    fees: {
      type: String,
      required: true,
    },
    teachers: {
      type: [String],
      required: true,
    },
    hours: [
      {
        day: {
          type: String,
          required: true,
        },
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
    ],
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid", "All"],
      required: true,
    },
    results: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Venture = mongoose.model("Institute", ventureSchema);

export default Venture;
