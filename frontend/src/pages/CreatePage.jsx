import React, { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [release, setRelease] = useState(""); // updated field
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("Planned");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/movies", {
        title,
        genre,
        director,
        release, // updated field
        language,
        status,
        rating: Number(rating),
      });

      toast.success("Movie created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating movie", error);
      toast.error("Failed to create movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to Movies
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Movie</h2>

              <form onSubmit={handleSubmit}>

                {/* TITLE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Movie Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* GENRE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Genre</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Action, Drama"
                    className="input input-bordered"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                </div>

                {/* DIRECTOR */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Director</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Director Name"
                    className="input input-bordered"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    required
                  />
                </div>

                {/* RELEASE DATE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Release Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={release}
                    onChange={(e) => setRelease(e.target.value)}
                    required
                  />
                </div>

                {/* LANGUAGE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Language</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. English, Hindi"
                    className="input input-bordered"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  />
                </div>

                {/* STATUS */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Planned">Planned</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* RATING */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Rating (Out of 10)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="e.g. 8"
                    className="input input-bordered"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </div>

                {/* SUBMIT */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Movie"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;