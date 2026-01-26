import { startups } from "../data/data.js";

export const getDataByPathParams = (req, res) => {
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
};
