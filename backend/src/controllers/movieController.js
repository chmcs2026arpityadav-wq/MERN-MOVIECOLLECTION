import Movie from "../models/movieModel.js";

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error in getAllMovies", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error in getMovieById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createMovie(req, res) {
  try {
    const { title, genre, director, release, language, status, rating } = req.body;

    if (!title || !genre || !director || !release || !language || !status || rating === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const movie = new Movie({ title, genre, director, release, language, status, rating });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error("Error in createMovie", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateMovie(req, res) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found" });

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error in updateMovie", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteMovie(req, res) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMovie", error);
    res.status(500).json({ message: "Internal server error" });
  }
}