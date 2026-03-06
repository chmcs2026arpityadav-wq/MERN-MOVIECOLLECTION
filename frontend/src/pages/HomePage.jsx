import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCard.jsx";
import MovieNotFound from "../components/MovieNotFound.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortRating, setSortRating] = useState(""); // "asc" or "desc"

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
        setFilteredMovies(res.data);
      } catch (error) {
        console.log("Error fetching movies:", error);
        toast.error("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let updated = [...movies];

    // Search by title or director
    if (searchTerm) {
      updated = updated.filter(
        (m) =>
          m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by language
    if (languageFilter) {
      updated = updated.filter(
        (m) => m.language.toLowerCase() === languageFilter.toLowerCase()
      );
    }

    // Filter by status
    if (statusFilter) {
      updated = updated.filter(
        (m) => m.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Sort by rating
    if (sortRating) {
      updated.sort((a, b) =>
        sortRating === "asc" ? a.rating - b.rating : b.rating - a.rating
      );
    }

    setFilteredMovies(updated);
  }, [searchTerm, languageFilter, statusFilter, sortRating, movies]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search by title or director"
            className="input input-bordered w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:w-1/5"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="">All Languages</option>
            {[...new Set(movies.map((m) => m.language))].map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full md:w-1/5"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {[...new Set(movies.map((m) => m.status))].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full md:w-1/5"
            value={sortRating}
            onChange={(e) => setSortRating(e.target.value)}
          >
            <option value="">Sort by Rating</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {loading && (
          <div className="text-center text-primary py-10">
            Loading movies...
          </div>
        )}

        {!loading && filteredMovies.length === 0 && <MovieNotFound />}

        {!loading && filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                setMovies={setMovies}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;