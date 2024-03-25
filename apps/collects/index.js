import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./src/routes/index.js";
import { connectMongo } from "./src/datasources/ak247/dbConnect.js";
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.listen(3004, () => {
  connectMongo();
  app.use(router);
  console.log("Listen on port 3004");
});
