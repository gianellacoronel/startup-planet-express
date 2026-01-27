import express from "express";
import { apiRouter } from "./routes/apiRoutes.js";
import cors from "cors";

/*
Challenge:
1. If a client uses an unknown route, serve this JSON

{ message: "Endpoint not found. Please check the API documentation." }

Remember to server an error code!

Test:
http://localhost:8000/wrong-api/useless/user
*/

const PORT = 8000;

const app = express();

app.use(cors()); // This allows everyone to use the API //3rd Party Middleware
app.use("/api", apiRouter); //Built-in  Middleware

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found. Please check the API documentation.",
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${8000}`));
