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
1. Add a new route which accepts GET requests to /api/<field>/<term>.
2. Filter the data based on the path params.
3. Serve the filtered data.

For now, don’t worry that using some fields will trigger an error.

** The functionality **
Get all startups in a given country via api/country/<country name>
Get all startups in a given continent via api/continent/<continent name>
Get all startups in a given industry via api/industry/<industry name>

**Test Cases**

These should work:
  api/country/india
  api/continent/europe
  api/industry/ai

This will throw an error - but that's fine!
	api/has_mvp/true

*/

app.get("/api/:field/:term", (req, res) => {
  const { field, term } = req.params;
  const filterData = startups.filter(
    (startup) => startup[field].toLowerCase() === term.toLowerCase(),
  );

  res.json(filterData);
});

app.listen(PORT, () => console.log(`Server listening on port ${8000}`));
