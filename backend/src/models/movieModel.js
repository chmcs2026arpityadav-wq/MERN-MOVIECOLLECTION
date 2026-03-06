import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    release: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } 
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;