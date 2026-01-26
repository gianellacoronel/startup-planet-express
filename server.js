import express from "express";

const PORT = 8000;

const celebrity = {
  type: "action hero",
  name: "JSON Statham",
};

const app = express();

app.get("/", (req, res) => {
  res.json(celebrity);
});

app.listen(PORT, () => `Server listening on port ${8000}`);
