import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./src/routes/index.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3002, () => {
  console.log("Listen on port 3002");
});
