import express from "express";
import { startups } from "./data/data.js";

const PORT = 8000;

const app = express();

app.get("/api", (req, res) => {
  let filteredData = startups;

  const { industry, country, continent, is_seeking_funding, has_mvp } =
    req.query;

  if (industry) {
    filteredData = filteredData.filter(
      (data) => data.industry.toLowerCase() === industry.toLowerCase(),
    );
  }

  if (country) {
    filteredData = filteredData.filter(
      (data) => data.country.toLowerCase() === country.toLowerCase(),
    );
  }
  if (continent) {
    filteredData = filteredData.filter(
      (data) => data.continent.toLowerCase() === continent.toLowerCase(),
    );
  }
  if (is_seeking_funding) {
    filteredData = filteredData.filter(
      (data) =>
        data.is_seeking_funding ===
        JSON.parse(is_seeking_funding.toLowerCase()),
    );
  }
  if (has_mvp) {
    filteredData = filteredData.filter(
      (data) => data.has_mvp === JSON.parse(has_mvp.toLowerCase()),
    );
  }

  res.json(filteredData);
});

/*
Challenge:
1. If the client’s 'field' is not supported, serve this object:
  {message: "Search field not allowed. Please use only 'country', 'continent', 'industry'" }
2. Chain in the .status(<code>) method to set a status code.
	What status code should you set?
3. You might run into an error! Find a solution!

*/
app.get("/api/:field/:term", (req, res) => {
  const { field, term } = req.params;
  const allowedFields = ["country", "continent", "industry"];

  if (!allowedFields.includes(field.toLowerCase())) {
    return res.status(400).json({
      message:
        "Search field not allowed. Please use only 'country', 'continent', 'industry'",
    });
  }

  const filterData = startups.filter(
    (startup) => startup[field].toLowerCase() === term.toLowerCase(),
  );
  return res.status(200).json(filterData);
});

app.listen(PORT, () => console.log(`Server listening on port ${8000}`));
