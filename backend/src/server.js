import express from "express";
import dotenv from "dotenv";
import dns from "node:dns";
import { connectDB } from "./config/db.js";
import movieRouters from "./routes/movieRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT || 3001;

app.use(
  cors({
   // origin: `http://localhost:5173`,
  })
);

app.use("/movies", movieRouters);

app.get("/", (req, res) => {
  res.redirect("/movies");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
