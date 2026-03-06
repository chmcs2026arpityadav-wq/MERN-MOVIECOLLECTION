import { Link, useLocation } from "react-router";
import { Film, UserCircle, Edit2, Trash2, Star, Globe } from "lucide-react";
import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const MovieCard = ({ movie, setMovies }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === `/movie/${movie._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/movies/${movie._id}`);
      setMovies((prev) => prev.filter((m) => m._id !== movie._id));
      toast.success("Movie deleted successfully");
    } catch (error) {
      toast.error("Failed to delete movie");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/movie/${movie._id}`}
        className={`block rounded-xl bg-base-100 p-4 border transition-all duration-200
          ${isActive ? "border-primary shadow-lg" : "border-base-300"}
          hover:border-primary hover:shadow-xl`}
      >
        {/* ID */}
        <p className="text-xs text-base-content/50 truncate mb-1">
          ID: {movie._id}
        </p>

        {/* Top Section */}
        <div className="flex justify-between items-start mb-2">
          <span className="badge badge-secondary">{movie.release}</span>
          <span className="badge badge-accent">{movie.status}</span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title */}
          <div className="flex items-center gap-2">
            <Film className="size-4 text-primary" />
            <p className="font-medium line-clamp-1">{movie.title}</p>
          </div>

          {/* Director */}
          <div className="flex items-center gap-2 text-base-content/70">
            <UserCircle className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">{movie.director}</p>
          </div>

          {/* Genre */}
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Film className="size-4 text-primary" />
            <p>{movie.genre}</p>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Globe className="size-4 text-primary" />
            <p>{movie.language}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-base-content/70">
            <Star className="size-4 text-yellow-500" />
            <p className="text-sm">{movie.rating}/10</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/movie/${movie._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Edit2 className="size-4 text-warning hover:scale-110 transition" />
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowModal(true);
            }}
            className="text-error hover:scale-110 transition"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        {/* Created/Updated Dates */}
        <div className="text-xs text-base-content/50 mt-3">
          Created: {movie.createdAt?.slice(0, 10)} | Updated:{" "}
          {movie.updatedAt?.slice(0, 10)}
        </div>
      </Link>

      {/* DELETE MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Movie
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{movie.title}</span>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default MovieCard;