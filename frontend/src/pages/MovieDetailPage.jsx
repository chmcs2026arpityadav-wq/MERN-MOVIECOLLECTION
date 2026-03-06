import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        toast.error("Failed to fetch the movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?"))
      return;

    try {
      await api.delete(`/movies/${id}`);
      toast.success("Movie deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  };

  const handleSave = async () => {
    if (!movie.title.trim() || !movie.director.trim()) {
      toast.error("Title and Director are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/movies/${id}`, {
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        release: movie.release,
        language: movie.language,
        status: movie.status,
        rating: Number(movie.rating),
      });
      toast.success("Movie updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update movie");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Top Actions */}
        <div className="flex justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" /> Back to Movies
          </Link>
          <button
            className="btn btn-error btn-outline"
            onClick={handleDelete}
          >
            <Trash2Icon className="size-5" /> Delete Movie
          </button>
        </div>

        {/* Form */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            {/* Title */}
            <div className="form-control mb-4">
              <label className="label">Title</label>
              <input
                type="text"
                className="input input-bordered"
                value={movie.title}
                onChange={(e) =>
                  setMovie({ ...movie, title: e.target.value })
                }
              />
            </div>

            {/* Director */}
            <div className="form-control mb-4">
              <label className="label">Director</label>
              <input
                type="text"
                className="input input-bordered"
                value={movie.director}
                onChange={(e) =>
                  setMovie({ ...movie, director: e.target.value })
                }
              />
            </div>

            {/* Genre */}
            <div className="form-control mb-4">
              <label className="label">Genre</label>
              <input
                type="text"
                className="input input-bordered"
                value={movie.genre}
                onChange={(e) =>
                  setMovie({ ...movie, genre: e.target.value })
                }
              />
            </div>

            {/* Release */}
            <div className="form-control mb-4">
              <label className="label">Release Date</label>
              <input
                type="date"
                className="input input-bordered"
                value={movie.release}
                onChange={(e) =>
                  setMovie({ ...movie, release: e.target.value })
                }
              />
            </div>

            {/* Language */}
            <div className="form-control mb-4">
              <label className="label">Language</label>
              <input
                type="text"
                className="input input-bordered"
                value={movie.language}
                onChange={(e) =>
                  setMovie({ ...movie, language: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div className="form-control mb-4">
              <label className="label">Status</label>
              <select
                className="select select-bordered"
                value={movie.status}
                onChange={(e) =>
                  setMovie({ ...movie, status: e.target.value })
                }
              >
                <option>Planned</option>
                <option>Watching</option>
                <option>Released</option>
              </select>
            </div>

            {/* Rating */}
            <div className="form-control mb-4">
              <label className="label">Rating (0-10)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="input input-bordered"
                value={movie.rating}
                onChange={(e) =>
                  setMovie({ ...movie, rating: e.target.value })
                }
              />
            </div>

            {/* Save Button */}
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {/* Created / Updated */}
            <p className="text-xs text-base-content/50 mt-4">
              Created: {movie.createdAt?.slice(0, 10)} | Updated:{" "}
              {movie.updatedAt?.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;