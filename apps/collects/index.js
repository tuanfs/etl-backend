import express from "express";
import axios from "axios";

const app = express();

axios
  .get("http://127.0.0.1:3003/")
  .then((response) => {
    console.log("response", response.statusText);
  })
  .catch((err) => {
    console.log("error", err);
  });
app.listen(3002, () => {
  console.log("Listen on port 3002");
});
