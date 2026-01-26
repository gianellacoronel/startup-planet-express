import express from "express";
import { startups } from "./data/data.js";

const PORT = 1234;

const app = express();

app.get("/api", (req, res) => {
  res.json(startups);
});

app.listen(PORT, () => `Server listening on port ${8000}`);
