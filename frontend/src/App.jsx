import React from "react" ;
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
};

export default App;